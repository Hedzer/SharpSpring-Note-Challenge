@echo off
cd public
php -S 0.0.0.0:8000 -t %cd%
pause