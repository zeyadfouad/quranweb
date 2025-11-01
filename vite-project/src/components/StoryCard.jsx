import React from "react";

export default function StoryCard({ title, summary, slug, onClick }) {
  return (
    <div className="card card-animate fade-in" onClick={onClick} style={{
      cursor: 'pointer',
      margin: "1.4em 0",
      padding: 22,
      maxWidth: 340,
      minHeight: 140,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      boxShadow: '0 8px 38px #a9743322, 0 1.5px 4.5px #b29b7138',
      border: '1.2px solid #eadccb',
      borderRadius: 19,
      background: 'linear-gradient(150deg, #fffaf6 70%, #f4e4ce 100%)',
      transition: 'transform .16s, box-shadow .21s, border .18s',
    }}>
      <h2 style={{margin:'0 0 10px 0',fontSize:22,fontWeight:700,borderBottom:'1.2px solid #e5d6bf',paddingBottom:8,width:'100%',color:'#a97433', letterSpacing:'.5px'}}> {title}</h2>
      <p style={{flex:1,margin:0,fontSize:16,lineHeight:'1.7',borderBottom:'1.2px dashed #efdec5',paddingBottom:7, marginBottom:9, color:'#6d4f1e'}}>{summary}</p>
      <div style={{display:'flex',gap:8,alignSelf:'stretch',justifyContent:'flex-end'}}>
        <button className="button-primary" style={{fontWeight:700,boxShadow:'0 2px 12px #a9743344', fontSize:15, letterSpacing:1}} onClick={(e)=>{e.stopPropagation(); onClick();}}>عرض التفاصيل</button>
      </div>
    </div>
  );
}
