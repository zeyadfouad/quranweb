import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/index.jsx';
import StoryDetailPage from './pages/story/[slug].jsx';
import AyatPage from './pages/ayat.jsx';
import LoginPage from './pages/login.jsx';
import StoriesPage from './pages/stories.jsx';
import TafsirPage from './pages/tafsir.jsx';
import QuestionsPage from './pages/questions.jsx';
import ProfilePage from './pages/profile.jsx';
import './styles/theme.css';
import './styles/animations.css';
import './styles/globals.css';
import { useEffect, useState } from 'react';
import AIChatBox from './components/AIChatBox';

async function sendToGemini(userMessage) {
  const res = await fetch('http://localhost:5001/ai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ input: userMessage }) });
  const data = await res.json();
  return data.ai || 'حدث خطأ مع خدمة الذكاء الاصطناعي';
}

function ChatFab({ messages, onSend, isLoading }) {
  const [open, setOpen] = useState(false);
  let hoverTimeout;
  const handleOpen = () => { if (!open) setOpen(true); };
  const handleClose = () => { hoverTimeout = setTimeout(() => setOpen(false), 150); };
  const handleStay = () => {clearTimeout(hoverTimeout);};
  return (
    <>
      <div style={{ position:'fixed', left:32, bottom:75, zIndex:2002 }}>
        <button aria-label="فتح الدردشة" onMouseEnter={handleOpen} onMouseLeave={handleClose} style={{ width:59,height:59,borderRadius:'50%', background:'linear-gradient(135deg,#a97433 78%,#daba82 100%)', boxShadow:'0 4px 22px #a9743344', border:'3px solid #fff', cursor:'pointer', display:'flex',alignItems:'center',justifyContent:'center', fontSize:34, color:'#fff', outline:'none', transition:'background .14s, box-shadow .18s' }}>💬</button>
      </div>
      {open && (
        <div style={{position:'fixed',left:108,bottom:85,zIndex:2005}} onMouseEnter={handleStay} onMouseLeave={handleClose}>
          <AIChatBox messages={messages} onSend={onSend} isLoading={isLoading} floating={true} />
        </div>
      )}
    </>
  );
}

function Header({ isLoggedIn, onLogout }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const LinkItem = ({to, children}) => <Link to={to} onClick={close} className='nav-link' style={{color:'#fff',textDecoration:'none',fontWeight:600,padding:'7px 13px',borderRadius:'11px',fontSize:16}}>{children}</Link>;
  return (
    <header style={{ display:'flex',alignItems:'center',justifyContent:'space-between', background:'linear-gradient(101deg, #a97433 65%, #daba82 100%)', padding:'18px 34px 15px 34px', borderRadius:'0 0 32px 32px', position:'sticky', top:0, zIndex:1000, boxShadow:'0 5px 32px #cda45e1a, 0 1.5px 6px #a9743344', minHeight:66 }}>
      <div style={{display:'flex',alignItems:'center',gap:18}}>
        <img src='/quran_logo.png' alt='شعار' style={{width:43,height:43,borderRadius:'14px',background:'#fff8',padding:4,boxShadow:'0 2px 10px #71441a25',border:'1.5px solid #ebd3b2'}} />
        <span style={{color:'#fff',fontSize:29,letterSpacing:1,fontFamily:'Cairo, Tajawal, sans-serif',fontWeight:800,textShadow:'0 1.7px 13px #683e1466'}}>موقع القرآن</span>
      </div>
      <nav className='top-nav' style={{display:'flex',gap:22,flexWrap:'wrap'}}>
        <LinkItem to='/'>الرئيسية</LinkItem>
        <LinkItem to='/stories'>قصص الأنبياء</LinkItem>
        <LinkItem to='/tafsir'>تفسير السور</LinkItem>
        <LinkItem to='/questions'>الأسئلة</LinkItem>
        <LinkItem to='/ayat'>الآيات</LinkItem>
        {isLoggedIn ? (
          <>
            <LinkItem to='/profile'>ملفي</LinkItem>
            <button onClick={()=>{onLogout(); close();}} className='nav-link' style={{color:'#fff',background:'transparent',border:'none',fontWeight:700,padding:'7px 13px',fontSize:16,cursor:'pointer'}}>تسجيل الخروج</button>
          </>
        ) : (
          <LinkItem to='/login'>تسجيل الدخول</LinkItem>
        )}
      </nav>
      <button className='hamburger' onClick={()=>setOpen(true)} aria-label='القائمة'><span></span></button>
      {open && (
        <>
          <div className='drawer-backdrop' onClick={close}></div>
          <div className={`drawer-panel open`}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <img src='/quran_logo.png' alt='شعار' style={{width:34,height:34,borderRadius:'10px',background:'#fff8',padding:4}} />
                <b style={{color:'#fff'}}>القائمة</b>
              </div>
              <button onClick={close} style={{background:'transparent',border:'2px solid #fff',color:'#fff',borderRadius:10,padding:'4px 8px',cursor:'pointer'}}>إغلاق</button>
            </div>
            <Link to='/' onClick={close} className='drawer-link'>الرئيسية</Link>
            <Link to='/stories' onClick={close} className='drawer-link'>قصص الأنبياء</Link>
            <Link to='/tafsir' onClick={close} className='drawer-link'>تفسير السور</Link>
            <Link to='/questions' onClick={close} className='drawer-link'>الأسئلة</Link>
            <Link to='/ayat' onClick={close} className='drawer-link'>الآيات</Link>
            {isLoggedIn ? (
              <>
                <Link to='/profile' onClick={close} className='drawer-link'>ملفي</Link>
                <button onClick={()=>{onLogout(); close();}} className='drawer-link' style={{background:'transparent',border:'none',textAlign:'right',cursor:'pointer'}}>تسجيل الخروج</button>
              </>
            ) : (
              <Link to='/login' onClick={close} className='drawer-link'>تسجيل الدخول</Link>
            )}
          </div>
        </>
      )}
    </header>
  );
}

function AppShell() {
  const [aiMessages, setAiMessages] = useState([{text: 'مرحبًا بك في موقع تعليم قصص الأنبياء! يمكنك طرح أي سؤال.', type:'ai'}]);
  const [aiLoading, setAiLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const location = useLocation();

  useEffect(() => { setIsLoggedIn(!!localStorage.getItem('token')); }, [location.pathname]);
  useEffect(() => {
    const handler = () => setIsLoggedIn(!!localStorage.getItem('token'));
    window.addEventListener('auth-changed', handler);
    return () => window.removeEventListener('auth-changed', handler);
  }, []);

  const handleSendAI = async txt => {
    setAiMessages(msgs=>[...msgs, { text: txt, type: 'user' }]);
    setAiLoading(true);
    try { const aiReply = await sendToGemini(txt); setAiMessages(msgs=>[...msgs, { text: aiReply, type: 'ai' }]); }
    catch { setAiMessages(msgs=>[...msgs, { text: 'تعذر الوصول إلى خدمة الذكاء الاصطناعي', type: 'ai' }]); }
    setAiLoading(false);
  };

  const logout = () => { localStorage.removeItem('token'); setIsLoggedIn(false); };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onLogout={logout} />
      <main style={{minHeight:'76vh',marginBottom:80}}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/stories' element={<StoriesPage />} />
          <Route path='/tafsir' element={<TafsirPage />} />
          <Route path='/questions' element={<QuestionsPage />} />
          <Route path='/story/:slug' element={<StoryDetailPage />} />
          <Route path='/ayat' element={<AyatPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </main>
      {/* تمت إزالة ChatFab لإخفاء أيقونة الدردشة */}
      <footer style={{ position:'fixed', bottom:0, left:0, right:0, background:'linear-gradient(90deg, #a97433 60%, #daba82 100%)', color:'#fff', fontSize:16, textAlign:'center', padding:'14px 10px 13px 10px', borderRadius:'20px 20px 0 0', boxShadow:'0 -4px 18px #cda45e38', fontFamily:'Cairo, Tajawal, sans-serif', zIndex:1200, letterSpacing:'.2px' }}>
        <span>&copy; {new Date().getFullYear()} جميع الحقوق محفوظة موقع القرآن &nbsp;|&nbsp; <span style={{fontSize:14, color:'#ece2ce'}}>﴿ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴾</span></span>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}