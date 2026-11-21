@echo off
title battleRank - Dev Launcher
echo ========================================================
echo          Inicializando battleRank (Full Stack)
echo ========================================================
echo.

echo [1/2] Iniciando Backend em http://localhost:3333...
start "battleRank API (Backend)" cmd /k "cd /d %~dp0backend && npm run dev"

echo [2/2] Iniciando Frontend em http://localhost:5173...
start "battleRank Web (Frontend)" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ========================================================
echo  Ambiente iniciado com sucesso em janelas dedicadas:
echo   - Backend:  http://localhost:3333 (API Express + Prisma)
echo   - Frontend: http://localhost:5173 (React 18 + Vite)
echo ========================================================
