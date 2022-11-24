const Discord = require("discord.js");
const DatabaseManager = require("../managers/DatabaseManager");

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String[]} args
 */
module.exports.execute = async function (client, message, args) {

  if (message.member.permissions.has("ADMINISTRATOR") == false) {
    message.reply("Bu komudu yönetmek için bir yetkiye sahip değilsin.")
    return;
  }

  let targetMember = message.mentions.members.first() || message.member;

  let user = message.mentions.members.first()

  let kullanıcılar = DatabaseManager.Database.collection("users");
  let kullanıcı = kullanıcılar.data(targetMember.id);

  let veri = await kullanıcı.get("profil");
  if (veri == undefined) {
    return message.reply("Karakter penceresi oluşturmadan bu işlemi yapamazsın.");
  }

  let statekle = String(args[0])
  let yazı = String(args[1])
  let sayı = Number(args[1])

  switch (statekle.toLowerCase()) {
    case "statü": {
      await kullanıcı.set("profil.Statü", yazı)
      return message.channel.send(`${user ? `${user}, ` : ""}Statü başarılı bir şekilde eklenmiştir.`)
    }
  }

  if (isNaN(sayı)) {
    return message.reply("Lütfen geçerli bir sayı giriniz.");
  }

  switch (statekle.toLowerCase()) {
    case "kuvvet": {
      await kullanıcı.add("profil.Kuvvet", sayı)
      message.channel.send(`${user ? `${user}, ` : ""}Kuvvet statı başarılı bir şekilde eklenmiştir.`)
      break;
    }
    case "dayanıklılık": {
      await kullanıcı.add("profil.Dayanıklılık", sayı);
      message.channel.send(`${user ? `${user}, ` : ""}Dayanıklılık statı başarılı bir şekilde eklenmişti.`)
      break;
    }
    case "çeviklik": {
      await kullanıcı.add("profil.Çeviklik", sayı);
      message.channel.send(`${user ? `${user}, ` : ""}Çeviklik statı başarılı bir şekilde eklenmiştir.`)
      break;
    }
    case "zeka": {
      await kullanıcı.add("profil.Zeka", sayı);
      message.channel.send(`${user ? `${user}, ` : ""}Zeka statı başarılı bir şekilde eklenmiştir.`)
      break;
    }
    case "seviye": {
      await kullanıcı.add("profil.Seviye", sayı);
      message.channel.send(`${user ? `${user}, ` : ""}Seviye miktarı başarılı bir şekilde eklenmiştir.`)
      break;
    }
    case "para": {
      await kullanıcı.add("profil.Para", sayı);
      message.channel.send(`${user ? `${user}, ` : ""}Para miktarı başarılı bir şekilde eklenmiştir.`)
      break;
    }
    case "can": {
      await kullanıcı.set("profil.CanDeğeri", Math.max(Math.min(veri.CanDeğeri + sayı, 100), 0));
      message.channel.send(`${user ? `${user}, ` : ""}Can değeri başarılı bir şekilde eklenmiştir.`)
      break;
    }
    case "mana": {
      await kullanıcı.set("profil.ManaDeğeri", Math.max(Math.min(veri.ManaDeğeri + sayı, 100), 0));
      message.channel.send(`${user ? `${user}, ` : ""}Mana değeri başarılı bir şekilde eklenmiştir.`)
      break;
    }
    case "ünvan": {
      await kullanıcı.add("profil.Ünvan", sayı)
      message.channel.send(`${user ? `${user}, ` : ""}Ünvan miktarı başarılı bir şekilde eklenmiştir.`)
      break;
    }
    default: message.channel.send('Girmek istediğin bir statı, eklemen ve girdiğin stata bir sayı belirtmen gerekiyor.\n Ekleyebileceğin statlar şunlar: `Kuvvet`, `Dayanıklılık`, `Çeviklik`,  `Zeka`. Bunların yanı sıra şu değerlere de Sayı ekleyebilmektesin: `Mana`, `Can`, `Seviye`. ')
      break;
  }
};
module.exports.command = {
  commands: ["ekle"]
};