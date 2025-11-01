const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();
app.use(cors());
app.use(express.json());

// مفتاح DeepSeek - يفضل نقله إلى متغير بيئة لاحقًا
const DEEPSEEK_API_KEY = 'sk-8dbe5259936947afa0227952e60c1cb0';
const DEEPSEEK_MODEL = 'deepseek-chat'; // يمكنك تغييره إلى deepseek-reasoner إذا رغبت

app.post('/ai', async (req, res) => {
  const { input } = req.body;
  try {
    const reply = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [
          { role: 'system', content: 'أنت مساعد عربي موجز ودقيق يساعد في التعليم القرآني والقصصي.' },
          { role: 'user', content: input }
        ],
        temperature: 0.7
      })
    });

    const data = await reply.json();

    if (!reply.ok) {
      console.error('DeepSeek API Error:', data);
      return res.status(500).json({ ai: 'تعذر الحصول على رد من DeepSeek. تحقق من المفتاح أو الحصة.' });
    }

    const text = data?.choices?.[0]?.message?.content || '';
    if (!text) {
      console.warn('Empty response from DeepSeek:', JSON.stringify(data));
      return res.json({ ai: 'لم أفهم السؤال بعد. من فضلك أعد صياغته.' });
    }

    res.json({ ai: text });
  } catch (e) {
    console.error('Proxy error:', e);
    res.status(500).json({ ai: 'حدث خطأ داخلي في الوسيط. حاول مجددًا.' });
  }
});

app.listen(4005, () => console.log('DeepSeek proxy running on 4005'));
