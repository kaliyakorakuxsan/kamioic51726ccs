const { cmd } = require('../command');
const config = require('../config');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "baga",
    alias: ["sinb", "platfdorm", "systemsstatus", "systemidnfo"],
    react: "🧬",
    desc: "Check bot system status with bug style.",
    category: "main",
    filename: __filename
},
async (robin, mek, m, {
    from, quoted, reply, sender
}) => {
    try {
        const uptimeStr = runtime(process.uptime());
        const usedRam = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const totalRam = (os.totalmem() / 1024 / 1024).toFixed(2);
        
        const statusText = `╭─〔 *🍷 SYSTEM INFO 🍷*〕─◉
│
│⏰ *Uptime*: ${uptimeStr}
│⏳ *Ram*: ${usedRam}MB / ${totalRam}MB
│🖥 *Host*: ${os.hostname()}
│🖊 *Prefix*: [ ${config.PREFIX} ]
│🛠 *Mode*: [ ${config.MODE} ] 
│🤵‍♂ *Owner*: ᴴᴵᴿᵁᴷᴬ ᴿᴬᴺᵁᴹᴵᵀ𝐇𝐀
│🧬 *Version*: ${config.BOT_VERSION}
╰─────────────────────────────⊷
> © Powerd by 𝗥𝗔𝗡𝗨𝗠𝗜𝗧𝗛𝗔-𝗫-𝗠𝗗 🌛`;

        // Bug/Payment Message Structure
        await robin.sendMessage(from, {
            requestPaymentMessage: {
                currencyCodeIso4217: 'LKR', // currency එක ලංකාවේ එකට දැම්මා
                amount1000: 1000000000, // ලොකු ගාණක් (Bug එකක් වගේ පේන්න)
                requestFrom: '0@s.whatsapp.net',
                noteMessage: {
                    extendedTextMessage: {
                        text: statusText,
                        contextInfo: {
                            mentionedJid: [sender],
                            externalAdReply: {
                                showAdAttribution: true,
                                title: `𝗥𝗔𝗡𝗨𝗠𝗜𝗧𝗛𝗔-𝗫-𝗠𝗗 𝗦𝗬𝗦𝗧𝗘𝗠`,
                                body: `ᴜᴘᴛɪᴍᴇ: ${uptimeStr}`,
                                mediaType: 1,
                                thumbnail: { url: "https://raw.githubusercontent.com/Ranumithaofc/RANU-FILE-S-/refs/heads/main/images/System%20%20info.jpg" },
                                sourceUrl: "https://whatsapp.com/channel/0029Vafn96S7z4k66VvX9O0A"
                            },
                            forwardingScore: 999,
                            isForwarded: true,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: '120363317972190466@newsletter',
                                newsletterName: '𝗥𝗔𝗡𝗨𝗠𝗜𝗧𝗛𝗔-𝗫-𝗠𝗗',
                                serverMessageId: 143
                            }
                        }
                    }
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.log("System Bug Style Error:", e);
        reply(`⚠️ Error: ${e.message}`);
    }
});
