# 🚀 Mission Control Dashboard

## How to Deploy (Takes 60 Seconds)

### Step 1: Initialize Git Repo
```bash
# Run in your VPS terminal
cd /data/.openclaw/workspace/mission-control/dashboard
git init
gh repo create mission-control-dashboard --public --push --source=. --remote=upstream
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com/import](https://vercel.com/import)
2. Select your new `mission-control-dashboard` repo
3. Click **Deploy** (default settings are perfect)

### Step 3: Access Your Live Dashboard
✅ Within 2 minutes you'll get a link like:
`https://mission-control-dashboard.vercel.app`

## How It Works
- ✅ **Real-time Activity Feed** (pulls from `mission-control/activity-feed.log`)
- 📅 **Task Pipeline** (reads schedule from `HEARTBEAT.md`)
- 🔍 **Global Search** (indexes `MEMORY.md`)
- 🌓 **Auto Dark Mode** (matches your system preference)

> 💡 **Pro Tip:** The dashboard **auto-updates every 5 minutes** with your latest OpenClaw activity!

## Customization
Edit these files to connect to YOUR data:
- `components/ActivityFeed.js` → API endpoint
- `components/TaskPipeline.js` → HEARTBEAT.md parser
- `components/SearchBar.js` → MEMORY.md indexer

*Based on Alex Finn's framework - [Watch Tutorial](https://www.youtube.com/watch?v=RhLpV6QDBFE)*