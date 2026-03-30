const axios = require('axios');
const { cmd } = require('../command');

// Menu Image
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
async (conn, mek, m, { from, reply }) => {

    let menuText = `
📰 *NEWS MENU*

1️⃣ Sirasa News  
2️⃣ BBC News  

👉 Reply with number (1 or 2)
`;

    await conn.sendMessage(from, {
        image: { url: menuImage },
        caption: menuText
    }, { quoted: fakevCard });

});


// HANDLE REPLY (number select)
cmd({
    on: "text"
},
async (conn, mek, m, { from, body, reply }) => {

    if (body === "1") {
        return await sendSirasaNews(conn, from, reply);
    }

    if (body === "2") {
        return await sendBBCNews(conn, from, reply);
    }

});


// Sirasa News Function
async function sendSirasaNews(conn, from, reply) {
    try {
        const res = await axios.get("https://appi.srihub.store/news/sirasa?apikey=dew_1TqE8N6MtFQH7myhpydg9K0XCgjNJVwyUJEE0Pic");

        if (!res.data.status) return reply("❌ Failed to fetch Sirasa news");

        const newsList = Array.isArray(res.data.result) ? res.data.result : [res.data.result];

        for (let news of newsList) {

            let msg = `📰 *${news.title}*\n\n📅 ${news.date}\n\n${news.desc}\n\n🔗 ${news.url}`;

            if (news.image) {
                await conn.sendMessage(from, {
                    image: { url: news.image },
                    caption: msg
                }, { quoted: fakevCard });
            } else {
                await conn.sendMessage(from, { text: msg }, { quoted: fakevCard });
            }

            await new Promise(r => setTimeout(r, 500));
        }

    } catch (err) {
        reply("❌ Error loading Sirasa news");
    }
}


// BBC News Function
async function sendBBCNews(conn, from, reply) {
    try {
        const res = await axios.get("https://appi.srihub.store/news/bbc?apikey=dew_1TqE8N6MtFQH7myhpydg9K0XCgjNJVwyUJEE0Pic");

        if (!res.data.status) return reply("❌ Failed to fetch BBC news");

        const newsList = Array.isArray(res.data.result) ? res.data.result : [res.data.result];

        for (let news of newsList) {

            let msg = `📰 *${news.title}*\n\n📅 ${news.date}\n\n${news.desc}\n\n🔗 ${news.url}`;

            if (news.image) {
                await conn.sendMessage(from, {
                    image: { url: news.image },
                    caption: msg
                }, { quoted: fakevCard });
            } else {
                await conn.sendMessage(from, { text: msg }, { quoted: fakevCard });
            }

            await new Promise(r => setTimeout(r, 500));
        }

    } catch (err) {
        reply("❌ Error loading BBC news");
    }
                                 }
