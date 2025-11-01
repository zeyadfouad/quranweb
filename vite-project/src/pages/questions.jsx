import React, { useMemo, useState } from 'react';
import data from '../data/questions.json';

export default function QuestionsPage() {
  const questions = useMemo(() => data.questions || [], []);
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return questions;
    return questions.filter(x => (x.question||'').includes(q) || (x.answer||'').includes(q));
  }, [questions, query]);

  return (
    <div dir="rtl" style={{maxWidth:1000,margin:'0 auto',padding:'10px 14px 40px 14px'}}>
      <section className="fade-in" style={{
        background: 'linear-gradient(145deg,#fff7ee 0%, #f3e1c9 100%)',
        border: '1px solid #ead7bf',
        borderRadius: 24,
        padding: '22px',
        boxShadow: '0 10px 40px #a974331f',
        margin: '18px 0 22px 0'
      }}>
        <h1 style={{margin:'0 0 10px 0', color:'#8a5f2c'}}>الأسئلة الشائعة</h1>
        <input
          value={query}
          onChange={e=>setQuery(e.target.value)}
          placeholder="ابحث في الأسئلة..."
          style={{width:'100%',padding:'12px 14px',borderRadius:12,border:'1px solid #e7d4ba',boxShadow:'0 2px 10px #a974330f',fontFamily:'inherit'}}
        />
      </section>

      <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',gap:16}}>
        {filtered.map((q, i) => (
          <div key={i} className="card slide-up" style={{padding:16,borderRadius:16,background:'#fffaf6'}}>
            <div style={{fontWeight:700,color:'#a97433',marginBottom:8}}>{q.question}</div>
            <div style={{color:'#6b4820',lineHeight:1.8}}>{q.answer}</div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="card" style={{gridColumn:'1/-1',textAlign:'center',padding:24}}>لا توجد نتائج للبحث.</div>
        )}
      </section>
    </div>
  );
}
