import React from "react";

export default function AyahModal({ ayahText, reference, tafseer, lessons, onClose }) {
  const copyAyah = async () => {
    try { await navigator.clipboard.writeText(`${ayahText} — ${reference}`); alert('تم النسخ ✅'); } catch { alert('تعذر النسخ'); }
  };
  const shareAyah = async () => {
    const content = `${ayahText}\n${reference}`;
    try { if (navigator.share) await navigator.share({ title:'آية قرآنية', text: content }); else { await navigator.clipboard.writeText(content + "\n" + window.location.href); alert('تم نسخ النص للمشاركة ✅'); } } catch {}
  };
  return (
    <div className="modal fade-in" style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(100,70,50,0.23)',
      zIndex: 1100,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 14,
      animation: 'fadeIn 0.85s cubic-bezier(.2,0,.5,1)'
    }}>
      <div className="zoom-in" style={{
        background: 'linear-gradient(135deg,#fffaf6 86%, #e9dcc5 100%)',
        borderRadius: '22px',
        padding: '34px 32px 28px 32px',
        maxWidth: 420,
        minWidth: 240,
        boxShadow: '0 16px 38px #a9743345, 0 2px 12px #7c56371a',
        position: 'relative',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        color: '#6c4a25'
      }}>
        <button onClick={onClose} style={{ position: 'absolute', left: 9, top: 12, fontSize: 26, background: 'none', border: 'none', color: '#a97433', cursor: 'pointer', fontWeight: 700, lineHeight: 1 }} aria-label="إغلاق المودال">×</button>
        <div className="ayah-text" style={{marginBottom: 6, fontSize: '1.19em',color:'#a97433'}}>{ayahText}</div>
        <div style={{color:'#967959', fontSize:15, marginBottom:14}}>{reference}</div>
        <div style={{display:'flex',gap:8,marginBottom:12}}>
          <button className="button-primary" onClick={copyAyah}>نسخ</button>
          <button className="button-primary" style={{background:'#b98d52'}} onClick={shareAyah}>مشاركة</button>
        </div>
        <div><b style={{color:'#a97433'}}>تفسير مبسط: </b><span style={{fontSize:15, color:'#6b4820'}}>{tafseer}</span></div>
        {lessons && lessons.length > 0 && (
          <ul style={{margin:"1.2em 0 0 0", color:'#977043',fontSize:15, padding:0, listStyle:'disc inside'}}>
            {lessons.map((l, idx) => <li key={idx}>{l}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
}
