const Discord = require("discord.js");
const DatabaseManager = require("../managers/DatabaseManager");
const { randomInteger } = require("stuffs");

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String[]} args
 */
module.exports.execute = async function (client, message, args) {
  let targetMember = message.mentions.members.first() || message.member;

  let user = message.mentions.members.first()

  let kullanıcılar = DatabaseManager.Database.collection("users");
  let kullanıcı = kullanıcılar.data(message.author.id);

  let veri = await kullanıcı.get("profil");
  if (veri == undefined) {
    return message.reply("Karakter penceresi oluşturmadan bu işlemi yapamazsın.");
  }

  // BURASI HEAL SİSTEMİDİR
  // BURASI ŞİFA BÜYÜSÜ İÇİNDİR

  let arg0 = String(args[0]).toLowerCase();

  if (arg0 == "iyileştir") {

    if (message.member.roles.cache.has("861217445695324188") == false) {
      return message.reply("Şifa büyüsünü yapabilmek için öğrenmen gerekiyor.")
    }

    if (veri.ManaDeğeri < 20) {
      return message.channel.send("Büyü kullanmak için yeterli mana değerin yok.")
    }

    let hp = 0;

    if (veri.Seviye >= 0 && veri.Seviye <= 10) {
      hp = randomInteger(1, 10);
    }
    if (veri.Seviye >= 11 && veri.Seviye <= 20) {
      hp = randomInteger(1, 20);
    }
    if (veri.Seviye >= 21 && veri.Seviye <= 30) {
      hp = randomInteger(1, 25);
    }
    if (veri.Seviye >= 31 && veri.Seviye <= 40) {
      hp = randomInteger(1, 30);
    }
    if (veri.Seviye >= 41 && veri.Seviye <= 50) {
      hp = randomInteger(1, 35);
    }
    if (veri.Seviye >= 51 && veri.Seviye <= 60) {
      hp = randomInteger(1, 40);
    }
    if (veri.Seviye >= 61 && veri.Seviye <= 70) {
      hp = randomInteger(1, 45);
    }
    if (veri.Seviye >= 71 && veri.Seviye <= 80) {
      hp = randomInteger(1, 50);
    }
    if (veri.Seviye >= 81 && veri.Seviye <= 90) {
      hp = randomInteger(1, 55);
    }
    if (veri.Seviye >= 91 && veri.Seviye <= 100) {
      hp = randomInteger(1, 60);
    }

    await kullanıcı.subtract("profil.ManaDeğeri", 20);

    let targetData = kullanıcılar.data(targetMember.id);
    let canver = await targetData.get("profil.CanDeğeri");
    canver += hp;

    await targetData.set("profil.CanDeğeri", Math.min(canver, 100))
    message.channel.send(`Yenilediğin can ${hp}`);

    return;
  }
  if (arg0 == "dizginleme") {

    if (message.member.roles.cache.has("861217445695324188") == false) {
      return message.reply("Şifa büyüsünü yapabilmek için öğrenmen gerekiyor.")
    }

    if (veri.ManaDeğeri <= 29) {
      return message.channel.send("Büyü kullanmak için yeterli mana değerin yok.")
    }

    if (veri.Seviye >= 20 && veri.Seviye <= 100) {
      await kullanıcı.subtract("profil.ManaDeğeri", 30);
      message.channel.send("Yerden çıkardığın sağlam kökler ile belirttiğin kişiyi kökler ile sararak hareket etmesini ve hareket uygulamasını kısıtladın.\n (Bir tur boyunca stunlı olacaksın)")
    } else {
      message.channel.send("Bu büyüyü yapmak için seviyen yetmiyor.")
    }

    return;
  }

  if (arg0 == "topraksütunu") {

    if (message.member.roles.cache.has("855868507354955827") == false) {
      return message.reply("Şifa büyüsünü yapabilmek için öğrenmen gerekiyor.")
    }

    if (veri.ManaDeğeri <= 29) {
      return message.channel.send("Büyü kullanmak için yeterli mana değerin yok.")
    }

    if (veri.Seviye >= 20 && veri.Seviye <= 100) {
      await kullanıcı.subtract("profil.ManaDeğeri", 30);
      message.channel.send("İki metre boyundaki bir toprak duvarı çıkardın.\n (Bir tur sonrasında bu duvar yıkılacaktır)")
    } else {
      message.channel.send("Bu büyüyü yapmak için seviyen yetmiyor.")
    }

    return;
  }

  if (arg0 == "ilahiyakarış") {
    if (message.member.roles.cache.has("855868507354955827") == false) {
      return message.reply("Şifa büyüsünü yapabilmek için öğrenmen gerekiyor.")
    }

    if (veri.ManaDeğeri <= 49) {
      return message.channel.send("Büyü kullanmak için yeterli mana değerin yok.")
    }

    if (veri.Seviye < 39) {
      return message.channel.send("Bu büyüyü yapmak için seviyen yetmiyor.")
    }

    if (veri.Seviye >= 40 && veri.Seviye <= 100) {
      await kullanıcı.subtract("profil.ManaDeğeri", 50)
      if (user == undefined) {
        message.channel.send("Başarılı bir şekilde belirtilen bir uzuvu iyileştirdin.")
      } else {
        message.channel.send("Başarılı bir şekilde" + " " + `${user ? `${user} ` : ""}` + " " + "adlı kişinin belirttiğin uzvunu iyileştirdin.")
      }
    }

    return;
  }
};

module.exports.command = {
  commands: ["şifa"]
};
