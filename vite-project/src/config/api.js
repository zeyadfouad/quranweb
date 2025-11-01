// API Configuration
// في التطوير المحلي: استخدم localhost
// في الإنتاج: سيتم استخدام متغير البيئة أو URL الافتراضي

export const API_BASE = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? 'http://localhost:5001' : 'https://quranweb.onrender.com');

export default API_BASE;

