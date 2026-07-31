# Roadmap

## FIXES
- Fix iso/chd/cue recognition for multi-platform formats (GameCube, PS2, PS1)
  Logic: check hash first, then match to platform

## Done ✅
- Monorepo setup (npm workspaces)
- TypeScript config
- Express backend with health endpoint
- Prisma + SQLite local database
- ROM scanner (POST /games/scan)
- CRC32 hashing for ROM identification
- No-Intro dat file parser with caching
- Metadata lookup and DB update from dat files
- Game launcher (POST /games/:id/launch) via RetroArch
- Platforms config (50+ consoles, cores, extensions, dat URLs)
- download-dats.ts, download-retroarch.ts, download-cores.ts scripts
- setup.ts orchestrator
- Electron + React desktop app
- Game library view with launch buttons
- Multi-platform core install system (ARM64 Mac support)

## In Progress
- Game library view with box art
- Backlog section (scrollable, user configurable 1-8 games)
- Game detail panel (box art, video, description)
- Console/platform view
- RetroAchievements widget

## Later
- ScreenScraper integration for cover art
- Background jobs with Temporal for metadata fetching
- Supabase social layer
- Friend achievement notifications
- RetroAchievements full integration
- Sentry error tracking
- File watcher for automatic library updates
- Cheat code files from libretro
- Cloud saves (sync to Google Drive/Dropbox/iCloud)
- Controller/xinput support
- Speedrun timer integration
- Social features (friends, leaderboards, live achievement popups)
- Update dat files on app update
- Wizard mode (smaller download, select platforms)
- Linux/ARM/Anbernic support

## Super good stuff to have
- Post-setup tests to verify cores are working
- RetroArch patch notes monitoring for breaking changes
- Development branch with auto-update checks
- Electron keytar package to encrypt user creds even if they're stored locally
- Test connection button in settings for retroachievements connection