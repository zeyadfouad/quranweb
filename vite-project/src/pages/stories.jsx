import React, { useMemo, useState } from 'react';
import storiesData from '../data/stories.json';
import StoryCard from '../components/StoryCard';
import { useNavigate } from 'react-router-dom';

export default function StoriesPage() {
  const navigate = useNavigate();
  const stories = useMemo(() => storiesData.stories || [], []);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return stories;
    return stories.filter(s =>
      (s.title||'').includes(q) || (s.short_summary||'').includes(q) || (s.keywords||[]).join(' ').includes(q)
    );
  }, [stories, query]);

  return (
    <div dir="rtl" style={{maxWidth:1100, margin:'0 auto', padding:'10px 14px 40px 14px'}}>
      <section className="fade-in" style={{
        background: 'linear-gradient(145deg,#fff7ee 0%, #f3e1c9 100%)',
        border: '1px solid #ead7bf',
        borderRadius: 24,
        padding: '28px 22px',
        boxShadow: '0 10px 40px #a974331f',
        margin: '18px 0 26px 0'
      }}>
        <h1 style={{margin:'0 0 8px 0',color:'#8a5f2c'}}>قصص الأنبياء</h1>
        <p style={{margin:'0 0 16px 0', color:'#6e4e24'}}>استكشف أجمل القصص والعِبر مع عرض أنيق وخفيف.</p>
        <div style={{display:'flex',gap:10}}>
          <input value={query} onChange={e=>setQuery(e.target.value)}
                 placeholder="ابحث باسم النبي أو كلمات مفتاحية..."
                 style={{flex:1,padding:'12px 14px',borderRadius:12,border:'1px solid #e7d4ba',boxShadow:'0 2px 10px #a974330f',fontFamily:'inherit'}} />
        </div>
      </section>

      <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))',gap:20}}>
        {filtered.map((story, idx) => (
          <div key={idx} className="slide-up" style={{animationDelay: (idx*60)+'ms'}}>
            <StoryCard
              title={story.title}
              summary={story.short_summary}
              slug={story.slug}
              onClick={()=>navigate(`/story/${story.slug}`)}
            />
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="card fade-in" style={{gridColumn:'1/-1',textAlign:'center',padding:24,color:'#7a5a2c'}}>
            لا توجد نتائج مطابقة للبحث.
          </div>
        )}
      </section>
    </div>
  );
}
