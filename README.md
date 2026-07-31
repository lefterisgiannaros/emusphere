# EmuSphere

A native desktop retro game launcher and library manager built for completionists and competitive retro gamers.

![Status](https://img.shields.io/badge/status-in%20development-orange)
![Platform](https://img.shields.io/badge/platform-Mac%20%7C%20Windows%20%7C%20Linux-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Smart ROM scanning** — Identifies games by CRC32 hash, not just filename. No more messy library.
- **50+ platforms supported** — NES to PS2, Game Boy to Dreamcast, Arcade to DOS.
- **One-click launch** — Powered by RetroArch. Every game, every platform, zero configuration.
- **Achievement tracking** — Full RetroAchievements integration with live friend notifications.
- **Backlog management** — Track what you're playing, what you've finished, what's next.
- **Cover art & metadata** — Scraped automatically from ScreenScraper.
- **Completionist focused** — Built for people who actually finish their games.

## Stack

Electron · React · Node.js · Prisma · SQLite · TypeScript · RetroArch

## Status

Currently in active development. Core features working:

- [x] ROM scanner with CRC32 identification
- [x] No-Intro dat file lookup (50+ platforms)
- [x] Game launcher via RetroArch
- [x] ARM64 Mac support
- [x] Automated core and dat file setup
- [ ] Cover art scraping (ScreenScraper)
- [ ] RetroAchievements integration
- [ ] Social features
- [ ] Settings UI
- [ ] First public release

## License

MIT
