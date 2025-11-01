import React, { useEffect, useMemo, useRef, useState } from 'react';
import heroData from '../data/hero.json';
import { useNavigate } from 'react-router-dom';

export default function HeroCarousel({ slides: slidesProp }) {
  const navigate = useNavigate();
  const slides = useMemo(() => slidesProp || heroData.slides || [], [slidesProp]);
  const [idx, setIdx] = useState(0);
  const timerRef = useRef();

  useEffect(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIdx((i) => (i + 1) % slides.length), 4500);
    return () => clearInterval(timerRef.current);
  }, [slides.length]);

  if (!slides.length) return null;

  const go = (next) => setIdx((i) => (i + next + slides.length) % slides.length);

  return (
    <div className="fade-in" style={{position:'relative',borderRadius:24,overflow:'hidden',boxShadow:'0 12px 44px #a9743322',margin:'16px 0 20px 0'}}>
      {slides.map((s, i) => (
        <div key={i}
          className="slide-up"
          style={{
            display: i === idx ? 'grid' : 'none',
            gridTemplateColumns: '1fr',
            alignItems:'center',
            justifyItems:'center',
            minHeight: 220,
            background: s.bg || 'linear-gradient(120deg,#fffaf6,#f0e0c6)',
            padding: '28px 18px',
          }}
        >
          <div style={{textAlign:'center',maxWidth:760}}>
            <h1 style={{margin:'0 0 6px 0',color:'#8a5f2c'}}>{s.title}</h1>
            <p style={{margin:'0 0 14px 0',color:'#6e4e24',fontSize:18}}>{s.subtitle}</p>
            {s.ctaText && (
              <button className="button-primary" onClick={() => navigate(s.ctaLink || '/')}>{s.ctaText}</button>
            )}
          </div>
        </div>
      ))}

      {/* أسهم */}
      <button aria-label="السابق" className="carousel-btn left" onClick={() => go(-1)}>‹</button>
      <button aria-label="التالي" className="carousel-btn right" onClick={() => go(1)}>›</button>

      {/* نقاط */}
      <div className="carousel-dots">
        {slides.map((_, i)=>(
          <span key={i} onClick={()=>setIdx(i)} className={`carousel-dot ${i===idx?'active':''}`} />
        ))}
      </div>
    </div>
  );
}
