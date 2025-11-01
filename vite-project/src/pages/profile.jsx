import React from 'react';

export default function ProfilePage() {
  const token = localStorage.getItem('token') || '';
  const emailInToken = token.startsWith('token-') ? token.replace('token-','') : '';
  const email = localStorage.getItem('userEmail') || emailInToken || 'مستخدم';
  const name = localStorage.getItem('userName') || (email ? email.split('@')[0] : '');
  return (
    <div dir="rtl" style={{maxWidth:700,margin:'0 auto',padding:'20px 14px'}}>
      <div className="card fade-in" style={{padding:22,borderRadius:18,background:'linear-gradient(160deg,#fffdf9 60%,#f4e4ce 100%)',boxShadow:'0 10px 34px #a9743320'}}>
        <h2 style={{marginTop:0,color:'#a97433'}}>الملف الشخصي</h2>
        <div style={{fontSize:18,color:'#6b4820'}}>مرحباً، <b>{name}</b></div>
        <div style={{marginTop:6,color:'#7b5a2f'}}>البريد: {email}</div>
      </div>
    </div>
  );
}
