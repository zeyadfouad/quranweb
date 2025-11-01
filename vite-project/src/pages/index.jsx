import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import storiesFile from "../data/stories.json";
import versesFile from "../data/verses.json";
import questionsFile from "../data/questions.json";
import StoryCard from "../components/StoryCard";
import VerseList from "../components/VerseList";
import AyahModal from '../components/AyahModal';
import HeroCarousel from '../components/HeroCarousel';

const Divider = () => (
  <div style={{ height: 14, borderRadius: 12, margin: '22px auto 26px auto', maxWidth: 920, background: 'linear-gradient(90deg, #e9dcc5 0%, #fffaf6 50%, #e9dcc5 100%)', boxShadow: 'inset 0 1px 3px #d0bfa3, 0 2px 10px #a974330f' }} />
);

export default function HomePage() {
  const [ayahModal, setAyahModal] = useState(null);
  const { stories = [] } = storiesFile;
  const { verses = [] } = versesFile;
  const { questions = [] } = questionsFile;
  const navigate = useNavigate();
  return (
    <div dir="rtl" className="fade-in" style={{padding:"10px 0 24px 0",maxWidth:1000,margin:'auto',fontFamily:'inherit'}}>
      <HeroCarousel />
      <h1 style={{textAlign:'center',color:'#155373',marginTop:18}}>قصص الأنبياء وتعليم الآيات</h1>

      {/* القصص - عرض 2 */}
      <div style={{display:'flex',flexWrap:'wrap',gap:24,justifyContent:'center',marginBottom:10}}>
        {stories.slice(0,2).map((story,i)=>(
          <StoryCard key={i} title={story.title} summary={story.short_summary} slug={story.slug} onClick={()=>navigate(`/story/${story.slug}`)} />
        ))}
      </div>
      <div style={{display:'flex',justifyContent:'center',marginTop:6}}>
        <button className="button-primary" onClick={()=>navigate('/stories')}>المزيد من القصص</button>
      </div>

      <Divider />

      {/* الآيات - عرض 2 */}
      <h2 style={{marginTop:10,textAlign:'center'}}>آيات مختارة</h2>
      <VerseList verses={verses.slice(0,2)} onVerseClick={setAyahModal} />
      <div style={{display:'flex',justifyContent:'center',marginTop:-6}}>
        <button className="button-primary" onClick={()=>navigate('/ayat')}>المزيد من الآيات</button>
      </div>

      <Divider />

      {/* الأسئلة - عرض 2 */}
      <h2 style={{textAlign:'center'}}>أسئلة شائعة</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))',gap:14,marginTop:10}}>
        {questions.slice(0,2).map((q,i)=>(
          <div key={i} className="card card-animate" style={{padding:16,borderRadius:16}}>
            <div style={{fontWeight:700,color:'#a97433',marginBottom:8}}>{q.question}</div>
            <div style={{color:'#6b4820',lineHeight:1.7}}>{q.answer}</div>
          </div>
        ))}
      </div>
      <div style={{display:'flex',justifyContent:'center',marginTop:12}}>
        <button className="button-primary" onClick={()=>navigate('/questions')}>المزيد من الأسئلة</button>
      </div>

      {ayahModal && (
        <AyahModal ayahText={ayahModal.text} reference={ayahModal.reference} audioUrl={ayahModal.audio} tafseer={ayahModal.tafseer} lessons={ayahModal.lessons} onClose={()=>setAyahModal(null)} />
      )}
    </div>
  );
}
