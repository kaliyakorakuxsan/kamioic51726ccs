const axios = require('axios');
const { cmd } = require('../command');

const menuImage = "https://files.catbox.moe/t66qvb.jpg";

// Fake vCard
const fakevCard = {
    key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "status@broadcast"
    },
    message: {
        contactMessage: {
            displayName: "© Mr Hiruka",
            vcard: `BEGIN:VCARD
VERSION:3.0
FN:Meta
ORG:META AI;
TEL;type=CELL;type=VOICE;waid=94762095304:+94762095304
END:VCARD`
        }
    }
};

// MENU COMMAND
cmd({
    pattern: "newsmenu",
    desc: "News menu",
    category: "news",
    react: "📰",
    filename: __filename
},
async (conn, mek, m, { from }) => {

    let menuText = `
📰 *NEWS MENU*

1️⃣ Sirasa News  
2️⃣ BBC News  

👉 Reply with *1* or *2*
`;

    await conn.sendMessage(from, {
        image: { url: menuImage },
        caption: menuText
    }, { quoted: fakevCard });

});


// HANDLE REPLY
cmd({
    on: "text"
},
async (conn, mek, m, { from, body, reply }) => {

    if (!m.quoted) return;

    let quotedText = m.quoted.text || "";

    // Only trigger if replying to our menu
    if (!quotedText.includes("NEWS MENU")) return;

    if (body === "1") {
        return await sendSirasa(conn, from, m);
    }

    if (body === "2") {
        return await sendBBC(conn, from, m);
    }

});


// 🔵 Sirasa News
async function sendSirasa(conn, from, m) {
    try {

        // ⏳ React (Processing)
        await conn.sendMessage(from, {
            react: { text: "⏳", key: m.key }
        });

        const res = await axios.get("https://appi.srihub.store/news/sirasa?apikey=dew_1TqE8N6MtFQH7myhpydg9K0XCgjNJVwyUJEE0Pic");

        if (!res.data.status) {
            await conn.sendMessage(from, {
                react: { text: "❌", key: m.key }
            });
            return;
        }

        const newsList = Array.isArray(res.data.result) ? res.data.result : [res.data.result];

        for (let news of newsList) {

            let msg = `
📰 *${news.title}*

📅 ${news.date}

${news.desc}

🔗 ${news.url}

> © Powered by RANUMITHA-X-MD 🌛
            `;

            if (news.image) {
                await conn.sendMessage(from, {
                    image: { url: news.image },
                    caption: msg
                });
            } else {
                await conn.sendMessage(from, { text: msg });
            }

            await new Promise(r => setTimeout(r, 500));
        }

        // ✅ Success React
        await conn.sendMessage(from, {
            react: { text: "✅", key: m.key }
        });

    } catch (err) {
        console.log(err);

        await conn.sendMessage(from, {
            react: { text: "❌", key: m.key }
        });
    }
}


// 🔴 BBC News
async function sendBBC(conn, from, m) {
    try {

        // ⏳ React
        await conn.sendMessage(from, {
            react: { text: "⏳", key: m.key }
        });

        const res = await axios.get("https://appi.srihub.store/news/bbc?apikey=dew_1TqE8N6MtFQH7myhpydg9K0XCgjNJVwyUJEE0Pic");

        if (!res.data.status) {
            await conn.sendMessage(from, {
                react: { text: "❌", key: m.key }
            });
            return;
        }

        const newsList = Array.isArray(res.data.result) ? res.data.result : [res.data.result];

        for (let news of newsList) {

            let msg = `
📰 *${news.title}*

📅 ${news.date}

${news.desc}

🔗 ${news.url}

> © Powered by RANUMITHA-X-MD 🌛
            `;

            if (news.image) {
                await conn.sendMessage(from, {
                    image: { url: news.image },
                    caption: msg
                });
            } else {
                await conn.sendMessage(from, { text: msg });
            }

            await new Promise(r => setTimeout(r, 500));
        }

        // ✅ Success React
        await conn.sendMessage(from, {
            react: { text: "✅", key: m.key }
        });

    } catch (err) {
        console.log(err);

        await conn.sendMessage(from, {
            react: { text: "❌", key: m.key }
        });
    }
}
