# Chowza (WhatsApp Food) — Digital Ordering & Vendor Platform

A WhatsApp-first food ordering platform and kitchen management system built for local restaurants and township takeaways.

---

## Quick Start (Frontend React / Vite App)

### 1. Prerequisites
Ensure you have **Node.js** (v18.0 or higher) installed on your computer.
- Download Node.js from: [https://nodejs.org](https://nodejs.org)

To check if Node.js and npm are installed:
```bash
node -v
npm -v
```

---

### 2. Installation
Open your terminal (PowerShell, Command Prompt, or Terminal on Mac/Linux) in the project folder and run:

```bash
npm install
```

This installs all required dependencies (`react`, `vite`, `tailwindcss`, `lucide-react`, `motion`).

---

### 3. Run Development Server

```bash
npm run dev
```

The terminal will display:
```
  VITE v8.x.x  ready in 250 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://0.0.0.0:3000/
```

Open your browser and navigate to: **`http://localhost:3000`**

---

### 4. Build for Production

To create an optimized production build:
```bash
npm run build
```
The compiled files will be output to the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

---

## Project Structure

```
├── index.html                 # HTML entry point with PWA meta tags & fonts
├── public/
│   ├── manifest.json          # Web App Manifest for mobile installation
│   ├── icon.svg               # App icon
│   └── icon-maskable.svg      # Android maskable icon
├── src/
│   ├── App.tsx                # Main application view container
│   ├── index.css              # Shared design system tokens & typography
│   ├── main.tsx               # React DOM root entry
│   ├── context/
│   │   └── AppContext.tsx     # State management & LocalStorage persistence
│   ├── data/
│   │   └── mockData.ts        # Initial restaurants, dishes, & orders
│   ├── hooks/
│   │   └── usePWAInstall.ts   # PWA installation hook
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces
│   └── components/
│       ├── Navigation.tsx         # Top navigation & quick switcher
│       ├── CustomerStore.tsx      # Digital restaurant menu storefront
│       ├── CartBottomSheet.tsx    # Mobile slide-up checkout & cart
│       ├── OrderTracker.tsx       # Live status tracker with prep timers
│       ├── WhatsAppSimulator.tsx  # WhatsApp interactive bot simulator
│       ├── BusinessDashboard.tsx  # Kitchen display system (KDS)
│       ├── MenuManager.tsx        # Add / edit / delete dishes
│       ├── QRCodeModal.tsx        # Table counter QR standee generator
│       ├── AnalyticsView.tsx      # Sales funnel & revenue charts
│       ├── BusinessSettings.tsx   # Store open/closed, bank, & Yoco keys
│       ├── SubscriptionView.tsx   # PayFast pricing plans & billing
│       ├── AdminView.tsx          # Multi-tenant platform administration
│       └── PWAInstallButton.tsx   # One-click install prompt
└── package.json
```

---

## (Optional) Running the Python Flask Backend

If you also want to run the standalone Flask Python server (`food.db`):

1. Install Python 3.10+ from [python.org](https://python.org).
2. Create and activate a virtual environment:
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate

   # macOS / Linux
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install Python requirements:
   ```bash
   pip install Flask Flask-SQLAlchemy Flask-Login Flask-WTF Flask-Limiter Pillow qrcode requests cryptography werkzeug
   ```
4. Start the Flask server:
   ```bash
   python app.py
   ```
   Runs by default on `http://127.0.0.1:5000`.
