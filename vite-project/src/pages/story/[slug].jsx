import React, { useState } from "react";
import { useParams } from "react-router-dom";
import storiesFile from "../../data/stories.json";
import AyahModal from "../../components/AyahModal";
import LoginSaveButton from "../../components/LoginSaveButton";
import MediaViewer from "../../components/MediaViewer";

export default function StoryDetailPage() {
  const { slug } = useParams();
  const story = (storiesFile.stories || []).find(x=>x.slug === slug);
  const [isSaved, setIsSaved] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [modalAyah, setModalAyah] = useState(null);
  if (!story) return <div style={{textAlign:'center',padding:80}}>قصة غير موجودة</div>;
  const share = async () => {
    const url = `${window.location.origin}/story/${slug}`;
    try { if (navigator.share) await navigator.share({ title: story.title, text: story.short_summary, url }); else { await navigator.clipboard.writeText(`${story.title}\n${story.short_summary}\n${url}`); alert('تم نسخ رابط المشاركة ✅'); } } catch {}
  };
  const copy = async () => {
    const url = `${window.location.origin}/story/${slug}`;
    try { await navigator.clipboard.writeText(`${story.title}\n${story.short_summary}\n${url}`); alert('تم النسخ ✅'); } catch { alert('تعذر النسخ'); }
  };
  return (
    <div dir="rtl" className="fade-in" style={{maxWidth:820,margin:'auto',padding:14}}>
      <h1>{story.title}</h1>
      <div style={{display:'flex',gap:8,margin:'6px 0 12px 0'}}>
        <button className="button-primary" onClick={copy}>نسخ</button>
        <button className="button-primary" style={{background:'#b98d52'}} onClick={share}>مشاركة</button>
      </div>
      {story.content.map((block,i) =>
        typeof block==="string" ? <p key={i}>{block}</p>
        : block.type==='list' ? <ul key={i}>{block.items.map((itm,idx)=><li key={idx}>{itm}</li>)}</ul>
        : block.type==='media' && block.cover_image ? (
            <MediaViewer key={i} mediaType={'image'} src={block.cover_image} caption={''} />
          ) : null
      )}
      <div style={{margin:"1.6em 0 1em 0",display:'flex',alignItems:'center',gap:12}}>
        <LoginSaveButton isLoggedIn={loggedIn} onSave={()=>setIsSaved(true)} isSaved={isSaved} />
      </div>
      <h3 style={{marginTop:44}}>آيات مرتبطة بالقصة:</h3>
      {story.related_verses.map((v,i)=>(
        <div key={i} style={{padding:10,margin:'8px 0',background:'#f4fafb',borderRadius:8,cursor:'pointer'}} className="fade-in card-animate" onClick={()=>setModalAyah(v)}>
          <span className="ayah-text">{v.text}</span>
          <span style={{marginRight:12,color:'#269',fontSize:14}}>{v.ref}</span>
        </div>
      ))}
      {modalAyah && <AyahModal ayahText={modalAyah.text} reference={modalAyah.ref} tafseer={modalAyah.tafseer} lessons={modalAyah.lessons} onClose={()=>setModalAyah(null)} />}
      <div style={{marginTop:22,color:'#466',fontSize:13}}>
        <b>كلمات مفتاحية:</b> {story.keywords.join("، ")}
      </div>
    </div>
  );
}
