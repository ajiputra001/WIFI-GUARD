# 🛡️ WiFi Guard Bot — WhatsApp & AI Voice Intrusion Detection System

**WiFi Guard Bot** — System Keamanan & Intrusi Jaringan Real-Time berbasis **Node.js, WhatsApp Web, dan Human AI Voice Announcement**. Memonitor setiap perangkat yang terhubung atau terputus dari Wi-Fi secara instan dan mengeluarkan notifikasi suara manusia jernih + pesan WhatsApp.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Debian](https://img.shields.io/badge/Debian-11%20%7C%2012%20%7C%2013-red)
![Ubuntu](https://img.shields.io/badge/Ubuntu-20.04%20%7C%2022.04%20%7C%2024.04-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## ✨ Fitur Utama

- 🔍 **Real-time Network Scanning** — Scan instan kernel netlink ARP & DNS resolution (<15ms)
- 🚆 **Human AI Voice Announcement** — Suara pengumuman jernih manusia (Gaya Stasiun Kereta / Google Neural AI)
- 🧠 **Smart Device Identification** — Identifikasi otomatis nama perangkat (`OPPO F11`, `Redmi A3`, `Galaxy A03s`), vendor, & tipe
- 📱 **WhatsApp Alert** — Notifikasi instan via pesan perorangan atau ID Grup WhatsApp
- 🤖 **WhatsApp Command System** — Perintah bot langsung via chat WhatsApp (`!status`, `!devices`, `!block`, dll)
- 🌐 **Web Dashboard** — Monitoring real-time UI Cyber Security Dark Mode (`http://localhost:3000`)
- 🔒 **Threat Classification** — Trusted / Known / Unknown / Suspicious detection

---

## ⚡ Quick One-Click Automated Install (Debian & Ubuntu)

Mendukung penuh OS Linux **Debian 11 (Bullseye), 12 (Bookworm), 13 (Trixie)** dan **Ubuntu 20.04, 22.04, 24.04**.

Cukup clone repository lalu jalankan script installer otomatis 1-klik:

```bash
# 1. Clone repository
git clone <URL_REPOSITORY_ANDA>
cd "PROJECT-LAB 1"

# 2. Jalankan installer otomatis (Semua dependensi terinstall otomatis!)
sudo bash install.sh
```

> 💡 Script `install.sh` akan secara otomatis menginstall Node.js 20 LTS, system tools (`arp-scan`, `nmap`, `espeak`, `speech-dispatcher`, `gstreamer`), dependensi NPM, dan membuat file `.env`.

---

## 🚀 Cara Menjalankan Bot

### 1. Jalankan Langsung (Standard)
```bash
sudo node src/index.js
```

### 2. Jalankan di Background Process (PM2)
```bash
# Menjalankan di latar belakang
sudo npx pm2 start src/index.js --name "wifi-guard"

# Melihat status & log
sudo npx pm2 status
sudo npx pm2 logs

# Stop bot
sudo npx pm2 stop wifi-guard
```

---

## ⚙️ Konfigurasi (.env)

Edit file `.env` untuk mengatur WhatsApp, Suara, dan Scanner:

```bash
nano .env
```

| Variable | Default | Deskripsi |
|----------|---------|-----------|
| `ALERT_PHONE_NUMBER` | — | Nomor WA / ID Grup penerima alert |
| `VOICE_ALERT_ENABLED` | `true` | Aktifkan suara speaker |
| `VOICE_ALERT_STYLE` | `stasiun` | Gaya suara (`stasiun`, `human`, `anime`) |
| `VOICE_ALERT_LANG` | `id` | Bahasa suara (`id` = Bahasa Indonesia) |
| `SCAN_INTERVAL` | `3` | Interval fast scan dalam detik |
| `ALERT_ON_DISCONNECT` | `true` | Notifikasi saat perangkat terputus |
| `DASHBOARD_PORT` | `3000` | Port web dashboard |

---

## 📱 WhatsApp Commands

Kirim perintah berikut ke WhatsApp Bot:

| Command | Fungsi |
|---------|--------|
| `!status` | Status bot & ringkasan jaringan |
| `!devices` | Daftar semua perangkat online |
| `!scan` | Force scan jaringan sekarang |
| `!trust <MAC>` | Tandai perangkat sebagai trusted |
| `!untrust <MAC>` | Hapus status trusted |
| `!block <MAC>` | Block perangkat |
| `!name <MAC> <nama>` | Beri nama custom ke perangkat |
| `!history` | Riwayat 24 jam terakhir |
| `!stats` | Statistik lengkap |
| `!help` | Tampilkan daftar perintah |

---

## 📜 License

MIT License — Free to use and modify.

**Made with ❤️ by AJIPUTRA-TECH Cybersecurity Division**
