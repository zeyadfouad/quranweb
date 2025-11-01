@echo off
echo ========================================
echo   تشغيل قاعدة البيانات و Backend و Frontend
echo ========================================
echo.
echo جاري التحقق من Python...
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python غير مثبت! يرجى تثبيت Python أولاً.
    pause
    exit /b 1
)

echo ✅ Python موجود
echo.
echo جاري التحقق من المكتبات...
cd backend_py
python -c "import flask" >nul 2>&1
if errorlevel 1 (
    echo ⚠️  جاري تثبيت مكتبات Python...
    pip install -r requirements.txt
    if errorlevel 1 (
        echo ❌ فشل تثبيت المكتبات
        pause
        exit /b 1
    )
)
cd ..

echo ✅ جميع المكتبات جاهزة
echo.
echo ========================================
echo   بدء الخوادم...
echo ========================================
echo.
echo 🚀 Backend: http://localhost:5001
echo 🚀 Frontend: http://localhost:5173
echo.
echo اضغط Ctrl+C لإيقاف جميع الخوادم
echo.

cd vite-project
npm run dev:all
pause


