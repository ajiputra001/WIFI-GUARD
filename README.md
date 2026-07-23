# 🛡️ WiFi Guard Bot — WhatsApp & AI Voice Network Intrusion Detection System

<p align="center">
  <img src="https://img.shields.io/github/actions/workflow/status/ajiputra001/WIFI-GUARD/ci.yml?branch=main&style=for-the-badge&logo=github&label=CI/CD%20Build" alt="Build Status" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Linux-Debian%20%7C%20Ubuntu-FCC624?style=for-the-badge&logo=linux&logoColor=black" alt="Linux OS" />
  <img src="https://img.shields.io/badge/Cybersecurity-IDS Engine-red?style=for-the-badge&logo=shield" alt="Cybersecurity" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
</p>

---

**WiFi Guard Bot** adalah sistem **Intrusion Detection System (IDS) Keamanan Jaringan Real-Time** berbasis **Node.js, WhatsApp Web, dan Human AI Voice Announcement**. Sistem ini memonitor setiap perangkat yang masuk, terhubung kembali, atau terputus dari jaringan Wi-Fi secara instan, serta mengeluarkan notifikasi suara manusia jernih + pesan WhatsApp otomatis.

---

## ✨ Fitur Utama

- 🔍 **Real-time Network Scanning** — Scan instan kernel netlink ARP & DNS resolution (<15ms)
- 🚆 **Human AI Voice Announcement** — Suara pengumuman jernih manusia (Gaya Stasiun Kereta / Google Neural AI)
- 🧠 **Smart Device Identification** — Identifikasi otomatis nama perangkat (`OPPO F11`, `Redmi A3`, `Galaxy A03s`, `Redmi Note 14`), vendor, & tipe
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
git clone https://github.com/ajiputra001/WIFI-GUARD.git
cd WIFI-GUARD

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
