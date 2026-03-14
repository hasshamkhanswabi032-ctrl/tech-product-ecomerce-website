@echo off
echo.
echo [ShopX - Project Upload]
echo.
echo Step 1: Initialize Git
git init
echo.
echo Step 2: Add files (excluding .env via .gitignore)
git add .
echo.
echo Step 3: Initial Commit
git commit -m "Initial commit: ShopX E-commerce Website (Silk & Ink UI)"
echo.
echo Step 4: Add Remote Repository
git remote add origin https://github.com/hasshamkhanswabi032-ctrl/tech-product-ecomerce-website.git
echo.
echo Step 5: Push to GitHub
git branch -M main
git push -u origin main
echo.
echo [Done] If any step failed, make sure you have Git installed (https://git-scm.com/)
pause
