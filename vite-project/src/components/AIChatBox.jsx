import React, { useRef } from "react";

export default function AIChatBox({ messages, onSend, isLoading, userProfile, floating }) {
  const inputRef = useRef();
  const handleSend = () => {
    if (inputRef.current.value.trim()) {
      onSend(inputRef.current.value);
      inputRef.current.value = '';
    }
  };
  return (
    <div
      className={
        "card fade-in" + (floating ? "" : "")
      }
      style={floating ? {
        position: 'fixed',
        left: 14,
        bottom: 14,
        zIndex: 2001,
        width: 312,
        maxWidth: '90vw',
        boxShadow: '0 4px 32px #442b1047',
        padding: 12,
        borderRadius: '18px',
      } : { maxWidth:480, margin:'auto',padding:16 }}
    >
      <div style={{maxHeight:240,overflowY:'auto',paddingBottom:10}}>
        {(messages || []).map((msg,i) => (
          <div key={i} style={{
             background:msg.type==='user'? '#eee':'#e4d1bc',
             alignSelf:msg.type==='user'? 'flex-end':'flex-start',
             color:msg.type==='user'? '#714':'#372',
             borderRadius:10,margin:"6px 0",padding:10,minWidth:50,maxWidth:250}}
          >
            <div>{msg.text}</div>
            {msg.type==='ai' && msg.references && <div style={{fontSize:12,marginTop:4,color:'#a97433'}}>{msg.references}</div>}
          </div>
        ))}
        {isLoading && <div style={{color:'#a97433'}}>جاري التحميل...</div>}
      </div>
      <div style={{display:'flex',marginTop:6}}>
        <input ref={inputRef} type="text" placeholder="اكتب سؤالك هنا..." style={{flex:1,padding:8,fontFamily:'inherit',borderRadius:8,border:'1px solid #dcc',boxShadow:'0 1px 3px #a9743322'}} onKeyDown={e=>e.key==='Enter'&&handleSend()} />
        <button onClick={handleSend} className="button-primary" disabled={isLoading} style={{marginRight:7}}>إرسال</button>
      </div>
    </div>
  );
}
