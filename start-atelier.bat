@echo off
title Atelier Noir - Luxury Jackets Launcher
echo ========================================================
echo        ATELIER NOIR - LUXURY JACKETS WEB APP
echo ========================================================
echo Starting Backend API Server (Port 5000)...
start "Atelier Backend" cmd /k "cd backend && npm start"

timeout /t 3 /nobreak >nul

echo Starting Frontend React Web App (Port 3000)...
start "Atelier Frontend" cmd /k "cd frontend && npm start"

timeout /t 2 /nobreak >nul

echo Opening browser at http://localhost:3000...
start http://localhost:3000

echo ========================================================
echo  All services launched!
echo  - Storefront: http://localhost:3000
echo  - Admin Portal: http://localhost:3000/admin/login
echo  - Backend API: http://localhost:5000
echo ========================================================
