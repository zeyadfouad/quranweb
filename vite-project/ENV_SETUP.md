# إعدادات الربط مع Backend Python

## كيفية ربط الموقع مع Backend Python

### 1. للتطوير المحلي (Development):

1. **تثبيت dependencies للـ Backend:**
   ```bash
   cd backend_py
   pip install -r requirements.txt
   ```

2. **تشغيل Backend Python:**
   ```bash
   cd backend_py
   python app.py
   ```
   - Backend سيعمل على: `http://localhost:5001`

3. **تشغيل Frontend (في نافذة terminal أخرى):**
   ```bash
   cd vite-project
   npm install  # إذا لم تكن مثبتة من قبل
   npm run dev
   ```
   - Frontend سيعمل على: `http://localhost:5173`

**أو استخدم ملف التشغيل السريع:**
```bash
# من المجلد الرئيسي
start-all.bat
```

الموقع سيتصل تلقائياً بـ Backend عبر proxy على `http://localhost:5001` عند التطوير.

### 2. للإنتاج (Production):

#### الطريقة 1: استخدام ملف .env (موصى به)

1. أنشئ ملف `.env` في مجلد `vite-project/` وأضف:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
   (استبدل `your-backend-url.onrender.com` برابط Backend الفعلي)

2. قم ببناء المشروع:
   ```bash
   cd vite-project
   npm run build
   ```

#### الطريقة 2: تعديل ملف api.js مباشرة

1. افتح `vite-project/src/config/api.js`
2. غيّر `'https://your-backend-url.onrender.com'` في السطر 19 إلى رابط Backend الخاص بك

3. قم ببناء المشروع:
   ```bash
   cd vite-project
   npm run build
   ```

## ملاحظات مهمة:

- ✅ ملف `.env` محمي في `.gitignore` ولن يتم رفعه إلى GitHub
- ✅ في وضع التطوير، يتم استخدام **proxy** من `vite.config.js` للاتصال بالـ Backend تلقائياً
- ✅ في وضع الإنتاج، يجب تحديد رابط Backend الفعلي في `.env` أو `api.js`
- ✅ تأكد من أن Backend يدعم CORS (موجود في `backend_py/app.py`)

## Endpoints المتاحة في Backend:

- `POST /api/register` - تسجيل مستخدم جديد
- `POST /api/login` - تسجيل الدخول
- `POST /ai` - طلب من AI (DeepSeek)
- `GET /` - فحص حالة الـ Backend

