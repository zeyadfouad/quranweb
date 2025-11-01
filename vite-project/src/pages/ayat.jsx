import React, { useState } from "react";
import versesFile from "../data/verses.json";
import VerseList from "../components/VerseList";
import AyahModal from "../components/AyahModal";

export default function AyatPage() {
  const [modalAyah, setModalAyah] = useState(null);
  const { verses = [] } = versesFile;
  return (
    <div dir="rtl" style={{maxWidth:850,margin:'auto',padding:'0 12px'}}>
      <h1 style={{color:'#155373',textAlign:'center'}}>آيات قرآنية مع تفسير مبسط</h1>
      <VerseList verses={verses} onVerseClick={setModalAyah} />
      {modalAyah && <AyahModal ayahText={modalAyah.text} reference={modalAyah.reference} audioUrl={modalAyah.audio} tafseer={modalAyah.tafseer} lessons={modalAyah.lessons} onClose={()=>setModalAyah(null)} />}
    </div>
  );
}
