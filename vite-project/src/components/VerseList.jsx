import React from "react";

export default function VerseList({ verses, onVerseClick }) {
  return (
    <div style={{display:'flex',flexWrap:'wrap',gap:18,justifyContent:'center',margin:'1.6em 0'}}>
      {verses.map((ayah, idx) => (
        <div
          key={idx}
          className="card card-animate fade-in"
          style={{
            minWidth: 220,
            maxWidth: 290,
            flex:'1 1 230px',
            margin: '6px 0',
            padding: '18px 18px 10px 18px',
            borderRadius: 21,
            boxShadow: '0 3px 22px #a9743318, 0 1.2px 4.5px #b59f6a21',
            background: 'rgba(215,188,145,0.11)',
            cursor: 'pointer',
            display:'flex',flexDirection:'column',alignItems:'flex-start',
            transition:'transform .15s,box-shadow .17s',
          }}
          onClick={()=>onVerseClick(ayah)}
        >
          <div className="ayah-text" style={{margin:0,fontWeight:600,fontSize:'1.28em',color:'#9b7343',maxWidth:'100%',wordBreak:'break-word',textAlign:'right',lineHeight:1.8}}>{ayah.text}</div>
          <div style={{fontSize:13,color:'#967959',marginTop:8,alignSelf:'flex-end',direction:'ltr'}}>{ayah.reference}</div>
        </div>
      ))}
    </div>
  );
}
