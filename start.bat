@echo off

cd "%~dp0"

start "Backend" cmd /k "cd server && npm run dev"
start "Frontend" cmd /k "cd client && npm run dev"