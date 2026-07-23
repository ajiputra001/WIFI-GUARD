// ═══════════════════════════════════════════════════════════════
// 🛡️ WiFi Guard Bot — Main Entry Point
// WhatsApp Network Intrusion Detection System
// ═══════════════════════════════════════════════════════════════

require('dotenv').config();

const chalk = require('chalk');
const figlet = require('figlet');

// Modules
const NetworkScanner = require('./scanner/network-scanner');
const DeviceIdentifier = require('./scanner/device-identifier');
const DB = require('./database/db');
const WhatsAppClient = require('./whatsapp/wa-client');
const MessageFormatter = require('./whatsapp/message-formatter');
const CommandHandler = require('./whatsapp/command-handler');
const AlertEngine = require('./alert/alert-engine');
const DashboardServer = require('./dashboard/server');

// ─────────────────────────────────────────
// Configuration from .env
// ─────────────────────────────────────────
const config = {
  alertPhoneNumber: process.env.ALERT_PHONE_NUMBER || '',
  networkInterface: process.env.NETWORK_INTERFACE || null,
  networkSubnet: process.env.NETWORK_SUBNET || null,
  scanInterval: parseInt(process.env.SCAN_INTERVAL) || 30,
  alertsEnabled: process.env.ALERTS_ENABLED !== 'false',
  alertOnDisconnect: process.env.ALERT_ON_DISCONNECT === 'true',
  dailyReportEnabled: process.env.DAILY_REPORT_ENABLED !== 'false',
  dailyReportHour: parseInt(process.env.DAILY_REPORT_HOUR) || 8,
  dailyReportMinute: parseInt(process.env.DAILY_REPORT_MINUTE) || 0,
  dashboardPort: parseInt(process.env.DASHBOARD_PORT) || 3000,
  dashboardEnabled: process.env.DASHBOARD_ENABLED !== 'false',
  deepScanEnabled: process.env.DEEP_SCAN_ENABLED !== 'false',
  deepScanInterval: parseInt(process.env.DEEP_SCAN_INTERVAL) || 5,
  voiceAlertEnabled: process.env.VOICE_ALERT_ENABLED !== 'false',
  voiceAlertStyle: process.env.VOICE_ALERT_STYLE || 'anime',
  voiceAlertLang: process.env.VOICE_ALERT_LANG || 'id',
  voiceAlertPitch: parseInt(process.env.VOICE_ALERT_PITCH) || 92,
  voiceAlertSpeed: parseInt(process.env.VOICE_ALERT_SPEED) || 165,
  voiceAlertOnNewDevice: process.env.VOICE_ALERT_ON_NEW_DEVICE !== 'false',
  voiceAlertOnReconnect: process.env.VOICE_ALERT_ON_RECONNECT === 'true',
  voiceAlertOnDisconnect: process.env.VOICE_ALERT_ON_DISCONNECT === 'true',
};

// ─────────────────────────────────────────
// Print Banner — AJIPUTRA-TECH
// ─────────────────────────────────────────
function printBanner() {
  const line = '═'.repeat(58);
  const thin = '─'.repeat(58);
  
  console.log('');
  console.log(chalk.cyan(`  ╔${line}╗`));
  console.log(chalk.cyan(`  ║`) + ' '.repeat(58) + chalk.cyan(`║`));

  // WiFi Guard ASCII Art
  const artLines = figlet.textSync('WiFi Guard', {
    font: 'Small',
    horizontalLayout: 'default',
  }).split('\n');

  for (const artLine of artLines) {
    const padded = artLine.padEnd(58).substring(0, 58);
    console.log(chalk.cyan(`  ║`) + chalk.cyanBright.bold(padded) + chalk.cyan(`║`));
  }

  console.log(chalk.cyan(`  ║`) + ' '.repeat(58) + chalk.cyan(`║`));
  console.log(chalk.cyan(`  ║`) + chalk.gray(`  ${thin.substring(0, 54)}  `) + chalk.cyan(`║`));
  console.log(chalk.cyan(`  ║`) + chalk.white.bold('    🛡️  WhatsApp Network Intrusion Detection System  ') + chalk.cyan(`  ║`));
  console.log(chalk.cyan(`  ║`) + chalk.gray(`  ${thin.substring(0, 54)}  `) + chalk.cyan(`║`));
  console.log(chalk.cyan(`  ║`) + ' '.repeat(58) + chalk.cyan(`║`));
  console.log(chalk.cyan(`  ║`) + chalk.hex('#FF6B00').bold('    ╔══════════════════════════════════════════════╗  ') + chalk.cyan(`║`));
  console.log(chalk.cyan(`  ║`) + chalk.hex('#FF6B00').bold('    ║') + chalk.hex('#FFD700').bold('   ⚡ Developed by ') + chalk.hex('#00E5FF').bold('AJIPUTRA-TECH') + chalk.hex('#FFD700').bold(' ⚡        ') + chalk.hex('#FF6B00').bold('║') + chalk.cyan(`  ║`));
  console.log(chalk.cyan(`  ║`) + chalk.hex('#FF6B00').bold('    ║') + chalk.hex('#90A4AE')('       Cybersecurity Division             ') + chalk.hex('#FF6B00').bold('║') + chalk.cyan(`  ║`));
  console.log(chalk.cyan(`  ║`) + chalk.hex('#FF6B00').bold('    ╚══════════════════════════════════════════════╝  ') + chalk.cyan(`║`));
  console.log(chalk.cyan(`  ║`) + ' '.repeat(58) + chalk.cyan(`║`));
  console.log(chalk.cyan(`  ║`) + chalk.gray('    v1.0.0 | Node.js | arp-scan + nmap + WhatsApp    ') + chalk.cyan(`  ║`));
  console.log(chalk.cyan(`  ║`) + ' '.repeat(58) + chalk.cyan(`║`));
  console.log(chalk.cyan(`  ╚${line}╝`));
  console.log('');
}

// ─────────────────────────────────────────
// Main Application
// ─────────────────────────────────────────
async function main() {
  printBanner();

  // 1. Initialize Database
  console.log(chalk.yellow('📦 Initializing database...'));
  const db = new DB();
  db.initialize();
  console.log(chalk.green('✅ Database ready'));

  // 2. Initialize Network Scanner
  console.log(chalk.yellow('📡 Initializing network scanner...'));
  const scanner = new NetworkScanner({
    interface: config.networkInterface,
    subnet: config.networkSubnet,
    deepScanEnabled: config.deepScanEnabled,
  });

  // Check dependencies
  const deps = await scanner.checkDependencies();
  if (!deps.arpScan) {
    console.log(chalk.red('⚠️  arp-scan not found. Install: sudo apt install arp-scan'));
    console.log(chalk.yellow('   Bot will use ARP table fallback (less accurate)'));
  }
  if (!deps.nmap) {
    console.log(chalk.red('⚠️  nmap not found. Install: sudo apt install nmap'));
    console.log(chalk.yellow('   Deep scan (OS detection) will be disabled'));
  }

  // System info
  const systemInfo = scanner.getSystemInfo();
  console.log(chalk.green('✅ Network scanner ready'));
  console.log(chalk.gray(`   Interface: ${systemInfo.interface}`));
  console.log(chalk.gray(`   Local IP:  ${systemInfo.localIP}`));
  console.log(chalk.gray(`   Subnet:    ${systemInfo.subnet}`));

  // 3. Initialize Device Identifier
  const identifier = new DeviceIdentifier();
  console.log(chalk.green('✅ Device identifier ready'));

  // 4. Initialize Message Formatter
  const formatter = new MessageFormatter();

  // 5. Initialize WhatsApp Client
  console.log(chalk.yellow('📱 Initializing WhatsApp client...'));
  
  if (!config.alertPhoneNumber) {
    console.log(chalk.red('⚠️  ALERT_PHONE_NUMBER not set in .env'));
    console.log(chalk.yellow('   Bot will run but WhatsApp alerts will be disabled'));
    console.log(chalk.yellow('   Set it in .env file: ALERT_PHONE_NUMBER=6281234567890'));
  }

  const waClient = new WhatsAppClient({
    alertPhoneNumber: config.alertPhoneNumber,
  });

  // 6. Initialize Alert Engine
  const alertEngine = new AlertEngine({
    db, scanner, identifier, formatter, waClient,
    config: {
      scanInterval: config.scanInterval,
      deepScanInterval: config.deepScanInterval,
      alertsEnabled: config.alertsEnabled,
      alertOnDisconnect: config.alertOnDisconnect,
      dailyReportEnabled: config.dailyReportEnabled,
      dailyReportHour: config.dailyReportHour,
      dailyReportMinute: config.dailyReportMinute,
      voiceAlertEnabled: config.voiceAlertEnabled,
      voiceAlertStyle: config.voiceAlertStyle,
      voiceAlertLang: config.voiceAlertLang,
      voiceAlertPitch: config.voiceAlertPitch,
      voiceAlertSpeed: config.voiceAlertSpeed,
      voiceAlertOnNewDevice: config.voiceAlertOnNewDevice,
      voiceAlertOnReconnect: config.voiceAlertOnReconnect,
      voiceAlertOnDisconnect: config.voiceAlertOnDisconnect,
    },
  });

  // 7. Initialize Command Handler
  const commandHandler = new CommandHandler({
    db, scanner, identifier, formatter, alertEngine, waClient,
  });

  // Set message handler
  waClient.onMessage(async (msg) => {
    await commandHandler.handleMessage(msg);
  });

  // 8. Initialize Dashboard
  let dashboard = null;
  if (config.dashboardEnabled) {
    console.log(chalk.yellow('🌐 Initializing dashboard...'));
    dashboard = new DashboardServer({
      db, scanner,
      port: config.dashboardPort,
    });

    // Connect alert engine to dashboard for real-time updates
    alertEngine.onDeviceUpdate((event, data) => {
      dashboard.handleDeviceUpdate(event, data);
    });

    dashboard.start();
    console.log(chalk.green(`✅ Dashboard ready`));
  }

  // 9. Start WhatsApp Client
  try {
    await waClient.initialize();
    console.log(chalk.green('✅ WhatsApp client ready'));

    // Send startup message
    if (config.alertPhoneNumber) {
      const startupMsg = formatter.formatStartup(systemInfo);
      await waClient.sendAlert(startupMsg);
    }
  } catch (error) {
    console.log(chalk.red(`❌ WhatsApp init failed: ${error.message}`));
    console.log(chalk.yellow('   Bot will continue without WhatsApp (dashboard & scanner still active)'));
  }

  // 10. Start Alert Engine (begins scanning)
  console.log(chalk.yellow('⚡ Starting alert engine...'));
  alertEngine.start();

  // ─────────────────────────────────────────
  // Summary
  // ─────────────────────────────────────────
  console.log('');
  console.log(chalk.cyan('═══════════════════════════════════════════'));
  console.log(chalk.cyan.bold('  🛡️  WiFi Guard Bot is RUNNING'));
  console.log(chalk.cyan('═══════════════════════════════════════════'));
  console.log(chalk.gray(`  📡 Scanning every ${config.scanInterval}s`));
  console.log(chalk.gray(`  🔍 Deep scan every ${config.deepScanInterval}m`));
  if (config.alertPhoneNumber) {
    console.log(chalk.gray(`  📱 Alerts → ${config.alertPhoneNumber}`));
  }
  const styleLabel = config.voiceAlertStyle === 'stasiun' 
    ? '🚆 Suara Pengumuman Stasiun (Manusia AI)' 
    : config.voiceAlertStyle === 'anime' 
    ? '🌸 Anime Girl Voice' 
    : '🎙️ Suara Manusia AI';
  console.log(chalk.gray(`  🔊 Voice Alert → ${config.voiceAlertEnabled ? styleLabel : 'OFF'}`));
  if (config.dashboardEnabled) {
    console.log(chalk.gray(`  🌐 Dashboard → http://localhost:${config.dashboardPort}`));
  }
  console.log(chalk.cyan('═══════════════════════════════════════════'));
  console.log('');

  // ─────────────────────────────────────────
  // Graceful Shutdown
  // ─────────────────────────────────────────
  const shutdown = async (signal) => {
    console.log(chalk.yellow(`\n🛑 ${signal} received. Shutting down...`));
    
    alertEngine.stop();
    
    if (config.alertPhoneNumber && waClient.isReady) {
      try {
        await waClient.sendAlert('🛑 *WiFi Guard Bot OFFLINE*\n\nBot telah dihentikan.');
      } catch {}
    }
    
    await waClient.destroy();
    db.close();
    
    console.log(chalk.green('✅ Cleanup complete. Goodbye! 👋'));
    process.exit(0);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  // Keep process alive
  process.on('uncaughtException', (error) => {
    console.error(chalk.red('💥 Uncaught Exception:'), error);
  });

  process.on('unhandledRejection', (reason) => {
    console.error(chalk.red('💥 Unhandled Rejection:'), reason);
  });
}

// Run!
main().catch((error) => {
  console.error(chalk.red('💥 Fatal error:'), error);
  process.exit(1);
});
