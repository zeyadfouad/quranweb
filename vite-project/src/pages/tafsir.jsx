import React, { useMemo, useState } from 'react';
import data from '../data/tafsir.json';

export default function TafsirPage() {
  const surahs = useMemo(() => data.surahs || [], []);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(surahs[0]?.number || 1);
  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return surahs;
    return surahs.filter(s => (s.name||'').includes(q) || String(s.number).includes(q));
  }, [surahs, query]);
  const current = filtered.find(s => s.number === Number(selected)) || surahs.find(s => s.number === Number(selected));

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
        <h1 style={{margin:'0 0 10px 0', color:'#8a5f2c'}}>تفسير السور</h1>
        <div style={{display:'flex',gap:12,alignItems:'center',flexWrap:'wrap'}}>
          <input
            placeholder="ابحث باسم السورة أو رقمها..."
            value={query}
            onChange={e=>setQuery(e.target.value)}
            style={{flex:'1 1 260px',padding:'10px 12px',borderRadius:12,border:'1px solid #e7d4ba',fontFamily:'inherit',boxShadow:'0 2px 10px #a974330f'}}
          />
        </div>
        <div style={{
          display:'flex',gap:10,marginTop:12,overflowX:'auto',paddingBottom:4,
          scrollbarWidth:'thin'
        }}>
          {filtered.map(s => (
            <button
              key={s.number}
              onClick={()=>setSelected(s.number)}
              className="card-animate"
              style={{
                whiteSpace:'nowrap',
                padding:'9px 14px',
                borderRadius:999,
                border:'1px solid #e7d4ba',
                background: s.number===Number(selected) ? '#a97433' : '#fffaf6',
                color: s.number===Number(selected) ? '#fff' : '#6e4e24',
                boxShadow: s.number===Number(selected) ? '0 4px 18px #a9743344' : '0 2px 8px #a974330f',
                cursor:'pointer',
                fontFamily:'inherit',
                transition:'all .18s'
              }}
            >{s.number}. {s.name}</button>
          ))}
        </div>
      </section>

      {current ? (
        <section className="fade-in" style={{background:'#fffaf6',border:'1px solid #ead7bf',borderRadius:20,padding:'18px 18px 6px 18px',boxShadow:'0 6px 28px #a9743315'}}>
          <h2 style={{marginTop:0, color:'#a97433'}}>{current.name}</h2>
          {current.intro && <p style={{color:'#6e4e24'}}>{current.intro}</p>}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:14,marginTop:10}}>
            {(current.tafseer||[]).map((t, idx) => (
              <div key={idx} className="card card-animate slide-up" style={{padding:14,borderRadius:16,background:'rgba(215,188,145,0.11)'}}>
                <div style={{color:'#6b4820',lineHeight:1.9}}>{t}</div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <div className="card" style={{padding:18,textAlign:'center'}}>لا توجد بيانات تفسير متاحة.</div>
      )}
    </div>
  );
}
