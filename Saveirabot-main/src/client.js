const Discord = require("discord.js");
const client = new Discord.Client(); // Yeni bir client oluşturuyorum.
const fs = require("fs");
const path = require("path");
console.log("Bağlanıyor..");
const CONFIG = require("../config.json");
const DatabaseManager = require("./managers/DatabaseManager");

global.commands = [];

let komutDosyları = fs.readdirSync("./commands");

komutDosyları.forEach(komutDosyası => {

  let komut = require(path.resolve("./commands", komutDosyası));

  if (komut.hasOwnProperty("command")) {
    global.commands.push(komut)
  }

})

DatabaseManager.init(CONFIG.Mongodb).then(() => {
  client.login(CONFIG.Token);
})

client.on("ready", () => {
  console.log("Bot hazır!");
});

client.on("message", (message) => {

  if (
    message.author.bot ||
    message.channel.type != "text" ||
    !message.content.startsWith(CONFIG.Prefix)
  )
    return; // Eğer mesajı atan kişi bot ise veya mesajın kanal tipi "text" değil ise işlemi iptal et.

  let args = message.content.split(" ");
  let command = args[0].slice(CONFIG.Prefix.length);

  let cmd = global.commands.find((cmd) =>
    cmd.command.commands.includes(command)
  );
  if (cmd) {
    cmd.execute(client, message, args.splice(1));
  }
});

let mesajlar = {};

// 1
// 0.05

const EXP = {
  TOTAL: 1,
  PERWORD: 1
}

client.on("message", async (message) => {

  if (message.content == "Ramzak" || message.content == "ramzak") {
    message.channel.send("AMIN YOKSA BENİ DÜŞÜNMEYE BİLE KALKIŞMA ACİZ VARLIK!!!")
  }
})

client.on("message", async (message) => {
  let kullanıcılar = DatabaseManager.Database.collection("users");
  let targetMember = message.mentions.members.first() || message.member;
  let kullanıcı = kullanıcılar.data(targetMember.id);

  let veri = await kullanıcı.get("profil");

  if (message.author.bot) return;
  if (message.content.startsWith(CONFIG.Prefix)) return;
  if (!veri) return;

  let str = message.content;
  let kelimeSayısı = message.content.split(" ").length; // <= yeni alan

  let xpOrani = EXP.TOTAL * (kelimeSayısı * EXP.PERWORD);

  await kullanıcı.add("exp", xpOrani);
  let exp = await kullanıcı.get("exp") || 0;
  let seviye = await kullanıcı.get("profil.Seviye") || 0;
  let array = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]

  if (exp >= 100 * (1.3 * (seviye + 1))) {
    await kullanıcı.set("exp", 0);
    await kullanıcı.add("profil.Seviye", 1);

    const channel = client.channels.cache.find(channel => channel.name === "【✨】level-up")

    if (array.some(element => (seviye + 1) == element)) {

      return channel.send(`${targetMember ? `${targetMember} ` : ""}` + "Tebrikler" + " " + (seviye + 1) + " " + "seviye oldun ve bununla birlikte bir tane stat puanı kazandın! Statını eklemek için stat dağıtma alanına yaz.")
    }
    channel.send(`${targetMember ? `${targetMember} ` : ""}` + "Tebrikler seviye atladın! Şu anki seviyen: " + (seviye + 1))
  }

});

