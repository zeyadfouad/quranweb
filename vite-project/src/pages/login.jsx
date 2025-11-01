import React, { useState } from "react";

export default function LoginPage() {
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', pass: '', pass2: '' });
  const [loading, setLoading] = useState(false);
  const isRegister = tab === 'register';

  const API_BASE = 'http://localhost:5001';

  const toast = (title, icon='info') => {
    if (window.Swal) window.Swal.fire({ title, icon, confirmButtonText: 'حسناً', confirmButtonColor: '#a97433' });
    else alert(title);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister && form.pass !== form.pass2) { toast('كلمتا المرور غير متطابقتين', 'warning'); return; }
    setLoading(true);
    const endpoint = isRegister ? '/api/register' : '/api/login';
    try {
      const body = isRegister ? { name: form.name, email: form.email, password: form.pass } : { email: form.email, password: form.pass };
      const res = await fetch(API_BASE+endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error||'فشل العملية');

      if (isRegister) {
        const userName = data.user?.name || (data.user?.email ? data.user.email.split('@')[0] : '');
        toast(`مرحباً ${userName || ''} ، تم إنشاء الحساب بنجاح 🎉\nالرجاء تسجيل الدخول الآن.`, 'success');
        setForm({ name:'', email: data.user?.email || '', pass:'', pass2:'' });
        setTab('login');
        setTimeout(()=>{ window.location.href = '/login'; }, 400);
        return;
      }

      // تسجيل الدخول
      if (data.token) localStorage.setItem('token', data.token);
      if (data.user?.name) localStorage.setItem('userName', data.user.name);
      if (data.user?.email) localStorage.setItem('userEmail', data.user.email);
      const userName = data.user?.name || (data.user?.email ? data.user.email.split('@')[0] : '');
      toast(`مرحباً ${userName || ''} ، تم تسجيل الدخول بنجاح ✅`, 'success');
      window.dispatchEvent(new Event('auth-changed'));
      setTimeout(()=>{ window.location.href = '/profile'; }, 400);
    } catch (err) {
      toast(err.message || 'تعذر تنفيذ العملية', 'error');
    } finally { setLoading(false); }
  };

  return (
    <div dir="rtl" style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'73vh'}}>
      <div className="card fade-in" style={{
        padding:36,minWidth:320,maxWidth:420,boxShadow:'0 16px 44px #a9743322',background:'linear-gradient(160deg,#fffdf9 60%,#f4e4ce 100%)',
        border:'1px solid #ead7bf',borderRadius:22,transform:'translateY(0)',transition:'transform .2s'
      }} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-4px)'} onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
        <div style={{display:'flex',gap:12,marginBottom:24,justifyContent:'center'}}>
          <button onClick={()=>setTab('login')} className="button-primary" style={{background:tab==='login'? '#a97433':'#e1ccb6'}}>تسجيل الدخول</button>
          <button onClick={()=>setTab('register')} className="button-primary" style={{background:tab==='register'? '#a97433':'#e1ccb6'}}>إنشاء حساب جديد</button>
        </div>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input style={{width:'100%',margin:'8px 0',padding:12,borderRadius:10,border:'1px solid #dfc7aa',fontFamily:'inherit',boxShadow:'0 2px 10px #a974330c'}} type="text" placeholder="الاسم" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required />
          )}
          <input style={{width:'100%',margin:'8px 0',padding:12,borderRadius:10,border:'1px solid #dfc7aa',fontFamily:'inherit',boxShadow:'0 2px 10px #a974330c'}} type="email" placeholder="البريد الإلكتروني" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} required />
          <input style={{width:'100%',margin:'8px 0',padding:12,borderRadius:10,border:'1px solid #dfc7aa',fontFamily:'inherit',boxShadow:'0 2px 10px #a974330c'}} type="password" placeholder="كلمة المرور" value={form.pass} onChange={e=>setForm(f=>({...f,pass:e.target.value}))} required />
          {isRegister && (<input style={{width:'100%',margin:'8px 0',padding:12,borderRadius:10,border:'1px solid #dfc7aa',fontFamily:'inherit',boxShadow:'0 2px 10px #a974330c'}} type="password" placeholder="تأكيد كلمة المرور" value={form.pass2} onChange={e=>setForm(f=>({...f,pass2:e.target.value}))} required />)}
          <button className="button-primary" style={{width:'100%',marginTop:18,boxShadow:'0 6px 24px #a9743330'}} disabled={loading}>{loading ? 'جارٍ الإرسال...' : isRegister ? 'إنشاء حساب' : 'تسجيل الدخول'}</button>
        </form>
      </div>
    </div>
  );
}
