const Discord = require("discord.js");
const DatabaseManager = require("../managers/DatabaseManager");

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String[]} args
 */
module.exports.execute = async function (client, message, args) {

  if (message.member.permissions.has("ADMINISTRATOR") == false) {
    message.reply("Bu botu yönetmek için bir yetkiye sahip değilsin.")
    return;
  }

  let targetMember = message.mentions.members.first() || message.member;

  let user = message.mentions.members.first()

  let kullanıcılar = DatabaseManager.Database.collection("users");
  let kullanıcı = kullanıcılar.data(targetMember.id);

  let veri = await kullanıcı.get("profil");

  if (veri.ManaDeğeri < 0) {
    veri.ManaDeğeri = 0;
    kullanıcı.set("profil", veri);
  }

  if (veri.ManaDeğeri > 100) {
    veri.ManaDeğeri = 100;
    kullanıcı.set("profil", veri);
  }

  let statsil = String(args[0])

  let yazı = String(args[1])
  let sayı = Number(args[1])

  switch (statsil.toLowerCase()) {
    case "statü": {
      await kullanıcı.set("profil.Statü", " ")
      return message.channel.send(`${user ? `${user}, ` : ""}Statü başarılı bir şekilde silinmiştir.`)
    }
  }
  if (isNaN(sayı)) {
    return message.reply("Lütefen geçerli bir sayı giriniz.");
  }

  switch (statsil.toLowerCase()) {
    case "kuvvet": {
      await kullanıcı.subtract("profil.Kuvvet", sayı);
      message.channel.send(`${user ? `${user}, ` : ""}Kuvvet statı başarılı bir şekilde silinmiştir.`)
      break;
    }
    case "dayanıklılık": {
      await kullanıcı.subtract("profil.Dayanıklılık", sayı);
      message.channel.send(`${user ? `${user}, ` : ""}Dayanıklılık statı başarılı bir şekilde silinmiştir.`)
      break;
    }
    case "çeviklik": {
      await kullanıcı.subtract("profil.Çeviklik", sayı);
      message.channel.send(`${user ? `${user}, ` : ""}Çeviklik statı başarılı bir şekilde silinmiştir.`)
      break;
    }
    case "zeka": {
      await kullanıcı.subtract("profil.Zeka", sayı);
      message.channel.send(`${user ? `${user}, ` : ""}Zeka statı başarılı bir şekilde silinmiştir.`)
      break;
    }
    case "seviye": {
      await kullanıcı.subtract("profil.Seviye", sayı);
      message.channel.send(`${user ? `${user}, ` : ""}Seviye miktarı başarılı bir şekilde silinmiştir.`)
      break;
    }
    case "para": {
      await kullanıcı.subtract("profil.Para", sayı);
      message.channel.send(`${user ? `${user}, ` : ""} Para miktarı başarılı bir şekilde silinmiştir.`)
      break;
    }
    case "can": {
      await kullanıcı.set("profil.CanDeğeri", Math.max(Math.min(veri.CanDeğeri - sayı, 100), 0));
      message.channel.send(`${user ? `${user}, ` : ""}Can Değeri başarılı bir şekilde silinmiştir.`)
      break;
    }
    case "mana": {
      await kullanıcı.set("profil.ManaDeğeri", Math.max(Math.min(veri.ManaDeğeri - sayı, 100), 0));
      message.channel.send(`${user ? `${user}, ` : ""}Mana Değeri başarılı bir şekilde  silinmiştir.`)
      break;
    }
    case "ünvan": {
      await kullanıcı.subtract("profil.Ünvan", sayı)
      message.channel.send(`${user ? `${user}, ` : ""}Ünvan miktarı başarılı bir şekilde silinmiştir.`)
      break;
    }
    default: message.channel.send('Silmek istediğin bir statı girmen ve girdiğin stata bir sayı belirtmen gerekiyor. Ekleyebileceğin statlar şunlar: `Kuvvet`, `Dayanıklılık`, `Çeviklik`,  `Zeka`. ')
      break;
  }

};

module.exports.command = {
  commands: ["sil"]
};
