' ---------------------------------------------------------------------------
'  ارائهٔ «مرکز رشد» — راه‌حل جایگزین START.vbs
'  اگر اجرای VBScript روی سیستم مسدود است، این فایل را دابل‌کلیک کنید.
'  پنجرهٔ کنسول چند ثانیه باز می‌ماند و بعد بسته می‌شود.
' ---------------------------------------------------------------------------
@echo off
setlocal
set "BASE=%~dp0"

if not exist "%BASE%runtime\node.exe" goto :missing
if not exist "%BASE%runtime\start.js" goto :missing

start "Markaz Roshd" /min "%BASE%runtime\node.exe" "%BASE%runtime\start.js"

rem صبر تا سرور آماده شود
for /l %%i in (1,1,40) do (
  timeout /t 1 /nobreak >nul
  powershell -NoProfile -Command "try { (New-Object Net.Sockets.TcpClient).Connect('127.0.0.1',3210); exit 0 } catch { exit 1 }" >nul 2>&1
  if not errorlevel 1 goto :open
)

:missing
echo.
echo  Runtime not found. Please copy the whole project folder.
echo  (runtime\node.exe and runtime\start.js are missing)
echo.
pause
exit /b 1

:open
start "" "http://127.0.0.1:3210"
exit /b 0
