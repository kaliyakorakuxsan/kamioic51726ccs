case 'systemx':
case 'sysx':
case 'infox': {
  const { cmd, commands } = require('../command');
  const os = require('os');
    
    try {
        await socket.sendMessage(from, { react: { text: "⚙️", key: msg.key } });

        // 1. System Info Data (RAM, Uptime, OS)
        const processUptime = process.uptime();
        const uptimeStr = `${Math.floor(processUptime / 3600)}h ${Math.floor((processUptime % 3600) / 60)}m ${Math.floor(processUptime % 60)}s`;
        const usedRam = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
        
        const sysText = `╭━━━〔 ⚙️ *SYSTEM INFO* 〕━━━╮
┃ 🤖 *BOT:* RANUMITHA-X-MD
┃ ⏱️ *UPTIME:* ${uptimeStr}
┃ 💾 *RAM:* ${usedRam} MB / ${totalRam} GB
┃ 🖥️ *OS:* ${os.type()} ${os.release()}
╰━━━━━━━━━━━━━━━━━━━━━╯

> *Powered by Whiteshadow MD Mini* 🚀`;

        // 2. Sticker එකක් Quote කරලා තිබුණොත් ඒක ලබා ගැනීම (Optional)
        let quotedSticker = null;
        if (msg.message?.extendedTextMessage?.contextInfo?.quotedMessage?.stickerMessage) {
            quotedSticker = msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage;
        }

        // 3. Payment Request Message Style
        await socket.sendMessage(from, {
            requestPaymentMessage: {
                currencyCodeIso4217: 'USD', // Baileys standard
                amount1000: 499000,         // $49.90 (Baileys standard)
                currency: 'USD',            // (Fallback from your snippet)
                amount: 49900,              // (Fallback from your snippet)
                requestFrom: sender,
                from: sender,
                noteMessage: {
                    extendedTextMessage: {
                        text: sysText,
                        contextInfo: {
                            // Channel Forward Style එක මෙතනින් යෙදේ
                            forwardingScore: 999,
                            isForwarded: true,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: '120363317972190466@newsletter',
                                newsletterName: '𝐖𝐇𝐈𝐓𝐄𝐒𝐇𝐀𝐃𝐎𝐖 𝐌𝐃',
                                serverMessageId: 143
                            }
                        }
                    }
                },
                sticker: quotedSticker, // Reply කරපු ස්ටිකරයක් තිබුණොත් එකතු වේ
                background: {
                    id: 'bg-001',
                    fileLength: '1024',
                    width: 512,
                    height: 512,
                    mimetype: 'image/webp',
                    placeholderArgb: 0xFF00FFFF,
                    textArgb: 0xFFFFFFFF,
                    subtextArgb: 0xFFAA00FF
                }
            }
        }, { quoted: msg });

        await socket.sendMessage(from, { react: { text: "✅", key: msg.key } });

    } catch (e) {
        console.error("System Cmd Error:", e);
        await socket.sendMessage(from, { text: `❌ *System Info Error:* ${e.message}` }, { quoted: msg });
    }
    break;
                      }
