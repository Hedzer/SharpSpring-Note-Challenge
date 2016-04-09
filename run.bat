@echo off
cd public
php -S localhost:8000 -t %cd%
pause