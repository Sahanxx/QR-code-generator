# QR Code Generator (React + Vite)

[![Deploy to GitHub Pages](https://github.com/Sahanxx/QR-code-generator/actions/workflows/deploy.yml/badge.svg)](https://github.com/Sahanxx/QR-code-generator/actions/workflows/deploy.yml)

Live: https://sahanxx.github.io/QR-code-generator/

A minimal QR Code generator built with React + Vite. Type text or a URL, preview instantly, tweak size/colors/error correction, and download as PNG or SVG.

---

## Features
- Live QR preview
- Download as PNG or SVG
- Adjustable size (128–512 px)
- Foreground/background color pickers
- Error correction levels: L, M, Q, H

## Tech
- React + Vite
- Library: [react-qr-code](https://github.com/rosskhanas/react-qr-code)
- Node.js 18+ recommended

---

## Quick start

```bash
# Clone your repo
git clone https://github.com/Sahanxx/QR-code-generator.git
cd QR-code-generator

# Install deps
npm install

# Start dev server
npm run dev
# open the URL shown in terminal (usually http://localhost:5173)

# Production build + local preview
npm run build
npm run preview
