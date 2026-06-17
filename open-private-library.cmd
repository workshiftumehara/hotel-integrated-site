@echo off
setlocal
cd /d "%~dp0"

echo Starting your private design library...
echo URL: http://127.0.0.1:3045/
echo.
echo This server binds to 127.0.0.1, so it is intended for this PC only.
echo Keep this window open while viewing the library.
echo.

start "" "http://127.0.0.1:3045/"
npm.cmd run dev:private
