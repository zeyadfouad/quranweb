import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
import requests

DB_PATH = os.environ.get('DB_PATH', 'users.db')
DEEPSEEK_API_KEY = os.environ.get('DEEPSEEK_API_KEY', 'sk-8dbe5259936947afa0227952e60c1cb0')
DEEPSEEK_MODEL = os.environ.get('DEEPSEEK_MODEL', 'deepseek-chat')

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute(
        '''CREATE TABLE IF NOT EXISTS users (
               id INTEGER PRIMARY KEY AUTOINCREMENT,
               email TEXT UNIQUE NOT NULL,
               password_hash TEXT NOT NULL,
               name TEXT
           )'''
    )
    try:
        c.execute('ALTER TABLE users ADD COLUMN name TEXT')
    except Exception:
        pass
    conn.commit()
    conn.close()

app = Flask(__name__)
CORS(app)
init_db()

@app.post('/api/register')
def register():
    data = request.get_json(silent=True) or {}
    email = (data.get('email') or '').strip().lower()
    password = (data.get('password') or '').strip()
    name = (data.get('name') or '').strip()
    if not email or not password:
        return jsonify({ 'error': 'يرجى إدخال البريد وكلمة المرور' }), 400
    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute('INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)', (email, generate_password_hash(password), name))
        conn.commit()
        conn.close()
        return jsonify({ 'user': { 'email': email, 'name': name } })
    except sqlite3.IntegrityError:
        return jsonify({ 'error': 'البريد مستخدم مسبقًا' }), 400

@app.post('/api/login')
def login():
    data = request.get_json(silent=True) or {}
    email = (data.get('email') or '').strip().lower()
    password = (data.get('password') or '').strip()
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('SELECT password_hash, name FROM users WHERE email=?', (email,))
    row = c.fetchone()
    conn.close()
    if not row:
        return jsonify({ 'error': 'لا يوجد مستخدم بهذا البريد' }), 400
    if not check_password_hash(row[0], password):
        return jsonify({ 'error': 'كلمة المرور غير صحيحة' }), 400
    name = row[1] or ''
    return jsonify({ 'token': f'token-{email}' , 'user': { 'email': email, 'name': name } })

@app.post('/ai')
def deepseek_ai():
    payload = request.get_json(silent=True) or {}
    user_text = (payload.get('input') or '').strip()
    try:
        r = requests.post(
            'https://api.deepseek.com/v1/chat/completions',
            headers={
                'Authorization': f'Bearer {DEEPSEEK_API_KEY}',
                'Content-Type': 'application/json'
            },
            json={
                'model': DEEPSEEK_MODEL,
                'messages': [
                    { 'role': 'system', 'content': 'أنت مساعد عربي موجز ودقيق يساعد في التعليم القرآني والقصصي.'},
                    { 'role': 'user', 'content': user_text }
                ],
                'temperature': 0.7
            },
            timeout=30
        )
        data = r.json()
        if not r.ok:
            return jsonify({ 'ai': 'تعذر الحصول على رد من DeepSeek. تحقق من المفتاح أو الحصة.' }), 500
        text = (data.get('choices') or [{}])[0].get('message', {}).get('content', '')
        if not text:
            return jsonify({ 'ai': 'لم أفهم السؤال بعد. من فضلك أعد صياغته.' })
        return jsonify({ 'ai': text })
    except Exception:
        return jsonify({ 'ai': 'حدث خطأ داخلي في الوسيط. حاول مجددًا.' }), 500

@app.get('/')
def root():
    return 'Flask + SQLite + DeepSeek proxy ready', 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=False)
