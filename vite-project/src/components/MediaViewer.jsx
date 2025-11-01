import React from "react";

export default function MediaViewer({ mediaType, src, caption }) {
  if (!src) return null;
  return (
    <div style={{textAlign:'center',margin:'1.3em 0'}}>
      {mediaType==='audio'
        ? <audio controls src={src} style={{width:'95%'}}/>
        : <img src={src} alt={caption||'صورة توضيحية'} style={{maxWidth:'90%',borderRadius:'10px'}}/>
      }
      {caption && <div style={{marginTop:8,fontSize:14,color:'#566'}}>{caption}</div>}
    </div>
  );
}
