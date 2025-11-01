// API Configuration
// في التطوير المحلي: يتم استخدام proxy من vite.config.js
// في الإنتاج: يجب تحديد رابط Backend الفعلي

const getApiBase = () => {
  // إذا كان هناك متغير بيئة محدد، استخدمه
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // في وضع التطوير، استخدم proxy من vite.config.js (مسار فارغ)
  // الـ proxy سيرسل الطلبات تلقائياً إلى http://localhost:5001
  if (import.meta.env.DEV) {
    return ''; // استخدام proxy من vite.config.js
  }
  
  // في الإنتاج، استخدم رابط Backend الفعلي
  // غيّر هذا الرابط إلى رابط Backend الخاص بك عند النشر
  return 'https://your-backend-url.onrender.com';
};

export const API_BASE = getApiBase();

export default API_BASE;

