@echo off
echo Starting Backend and Frontend...
start "Backend Server" cmd /k "cd backend_py && python app.py"
timeout /t 2 /nobreak >nul
start "Frontend Server" cmd /k "cd vite-project && npm run dev"
echo.
echo ========================================
echo Backend running on: http://localhost:5001
echo Frontend running on: http://localhost:5173
echo ========================================
pause


