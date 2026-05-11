# RwaSafe Frontend: Disaster Intelligence Dashboard

A futuristic, high-performance monitoring dashboard for Rwanda's Landslide Early Warning System. Built with Next.js 15, React, and Framer Motion.

## 🌟 Visual Philosophy
- **Command Center Aesthetic**: Dark theme with high-density data visualization.
- **Glassmorphism**: Premium frosted-glass cards with subtle border glows.
- **Real-time Intelligence**: Live GIS mapping, terminal-style SMS logs, and animated environmental indicators.
- **Emergency Awareness**: Full-screen pulsing red alerts and glowing critical status indicators.

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Maps**: Leaflet.js
- **Icons**: Lucide React
- **API**: Axios with real-time polling

## 🚀 Getting Started

### 1. Installation
```bash
cd rwasafe-frontend
npm install
```

### 2. Configuration
Ensure the backend is running at `http://localhost:8000`. You can adjust the API URL in `src/services/api.ts`.

### 3. Development Mode
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 📡 Key Components
- **Risk Map**: Interactive Leaflet map with colored sector risk markers.
- **Alert Feed**: Real-time sliding alert cards with critical prioritization.
- **SMS Monitor**: Terminal-style output for tracking emergency message dispatch.
- **Environmental Indicators**: Multi-source satellite data visualization (NASA, Sentinel, CHIRPS).
- **Analytics Engine**: Historical trend analysis for rainfall and soil saturation.
