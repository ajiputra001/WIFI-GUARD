#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# 🛡️ WiFi Guard Bot — One-Click Automated Installer
# Supports: Debian 11 (Bullseye), 12 (Bookworm), 13 (Trixie)
#           Ubuntu 20.04 (Focal), 22.04 (Jammy), 24.04 (Noble)
# ═══════════════════════════════════════════════════════════════

set -e

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

print_banner() {
    echo -e "${CYAN}"
    echo "  ╔══════════════════════════════════════════════════════════╗"
    echo "  ║                                                          ║"
    echo "  ║   🛡️  WiFi Guard Bot — Automated Installer              ║"
    echo "  ║       Cybersecurity Intrusion Detection System           ║"
    echo "  ║                                                          ║"
    echo "  ║   ⚡ Developed by AJIPUTRA-TECH                         ║"
    echo "  ║                                                          ║"
    echo "  ╚══════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

print_banner

# 1. Check Root Privileges
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}❌ installer ini membutuhkan akses root.${NC}"
    echo -e "${YELLOW}Jalankan ulang dengan:${NC} sudo bash install.sh"
    exit 1
fi

echo -e "${GREEN}[1/5] 🔍 Checking System Compatibility...${NC}"

# Detect OS
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS_NAME=$NAME
    OS_VER=$VERSION_ID
else
    echo -e "${RED}❌ /etc/os-release tidak ditemukan. Hanya mendukung Linux Debian/Ubuntu.${NC}"
    exit 1
fi

echo -e "   📍 Detected OS: ${CYAN}${OS_NAME} ${OS_VER}${NC}"

# 2. Update Package Lists
echo -e "\n${GREEN}[2/5] 📦 Updating System Packages...${NC}"
apt-get update -y

# 3. Install System Dependencies
echo -e "\n${GREEN}[3/5] 🛠️ Installing Network & Audio Dependencies...${NC}"
DEBIAN_FRONTEND=noninteractive apt-get install -y \
    curl \
    git \
    wget \
    gnupg \
    build-essential \
    arp-scan \
    nmap \
    speech-dispatcher \
    espeak \
    alsa-utils \
    pulseaudio-utils \
    gstreamer1.0-tools \
    gstreamer1.0-plugins-base \
    gstreamer1.0-plugins-good \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libasound2 || true

# 4. Check & Install Node.js (Version >= 18)
echo -e "\n${GREEN}[4/5] 🟢 Checking Node.js Environment...${NC}"

NODE_REQUIRED=18
NODE_INSTALLED=0

if command -v node >/dev/null 2>&1; then
    NODE_CUR_VER=$(node -v | cut -d'.' -f1 | sed 's/v//')
    if [ "$NODE_CUR_VER" -ge "$NODE_REQUIRED" ]; then
        NODE_INSTALLED=1
        echo -e "   ✅ Node.js $(node -v) is already installed."
    fi
fi

if [ "$NODE_INSTALLED" -eq 0 ]; then
    echo -e "${YELLOW}   ⚡ Node.js >= 18 belum terinstall. Mengunduh Node.js 20 LTS (NodeSource)...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
    echo -e "   ✅ Node.js $(node -v) successfully installed."
fi

# 5. Install Project NPM Dependencies
echo -e "\n${GREEN}[5/5] 📚 Installing Project Dependencies (NPM)...${NC}"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

npm install

# Setup .env if missing
if [ ! -f .env ]; then
    echo -e "${YELLOW}   ⚙️ Creating .env configuration from template...${NC}"
    cp .env.example .env
fi

echo -e "\n${CYAN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}${BOLD}  ✅ INSTALASI WIFIGUARD BOT SELESAI & SIAP DIGUNAKAN! ${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
echo -e "  📌 ${BOLD}Cara Menjalankan Bot:${NC}"
echo -e "     ${YELLOW}sudo node src/index.js${NC}"
echo -e ""
echo -e "  📌 ${BOLD}Atau Menjalankan di Background (PM2):${NC}"
echo -e "     ${YELLOW}sudo npx pm2 start src/index.js --name \"wifi-guard\"${NC}"
echo -e ""
echo -e "  🌐 ${BOLD}Dashboard Web:${NC} http://localhost:3000"
echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}\n"
