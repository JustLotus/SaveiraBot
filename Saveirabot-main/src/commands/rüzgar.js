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

  let user = message.mentions.members.first();

  let kullanıcılar = DatabaseManager.Database.collection("users");
  let kullanıcı = kullanıcılar.data(message.author.id);

  let veri = await kullanıcı.get("profil");
  if (veri == undefined) {
    return message.reply("Karakter penceresi oluşturmadan bu işlemi yapamazsın.");
  }

  // BURASI RÜZGAR BÜYÜSÜ İÇİNDİR

  let arg0 = String(args[0]).toLowerCase();

  if (arg0 == "rüzgarduvarı") {
    if (veri.ManaDeğeri <= 29) {
      return message.channel.send("Büyü kullanmak için yeterli mana değerin yok.");
    }
    if (veri.Seviye >= 60 && veri.Seviye <= 100) {
      await kullanıcı.subtract("profil.ManaDeğeri", 30);

      hasar = randomInteger(1, 18);
      if (hasar >= 10) {
        message.channel.send("Asanı kullanarak tüm menzilli saldırıları engelleyebilecek bir rüzgar duvarı oluşturdun.")
      } else {
        message.channel.send("Asanı kullanarak rüzgar duvarı oluşturmayı başaramadın.")
      }
    } else {
      message.channel.send("Bu büyüyü yapmak için seviyen yetmiyor.")
    }
    return;
  }

  if (user == undefined) {
    message.reply("Bir hedef belirtmen gerekiyor!");
    return;
  }

  if (message.member.roles.cache.has("861217445695324187") == false) {
    return message.reply("Rüzgar büyüsünü yapabilmek için öğrenmen gerekiyor.");
  }

  if (arg0 == "havatopu") {
    if (veri.ManaDeğeri <= 14) {
      return message.channel.send("Büyü kullanmak için yeterli mana değerin yok.");
    }
    if (veri.Seviye >= 5 && veri.Seviye <= 100) {
      await kullanıcı.subtract("profil.ManaDeğeri", 15);

      let targetData = kullanıcılar.data(user.id);
      let canDeğeri = await targetData.get("profil.CanDeğeri");
      hasar = randomInteger(1, 8);
      canDeğeri -= hasar;
      await targetData.set("profil.CanDeğeri", Math.min(canDeğeri, 100));

      message.channel.send("Attığın hasar zarı" + " " + hasar)
      message.channel.send("Asandan rüzgar topları çıkararak" + " " + `${user ? `${user} ` : ""}` + " " + "adlı kişiye fırlattın.");
    } else {
      message.channel.send("Bu büyüyü yapmak için seviyen yetmiyor.")
    }
  }
  if (arg0 == "havaakışı") {
    if (veri.ManaDeğeri <= 19) {
      return message.channel.send("Büyü kullanmak için yeterli mana değerin yok.");
    }
    if (veri.Seviye >= 15 && veri.Seviye <= 100) {
      await kullanıcı.subtract("profil.ManaDeğeri", 20);

      let targetData = kullanıcılar.data(user.id);
      let canDeğeri = await targetData.get("profil.CanDeğeri");
      hasar = randomInteger(1, 12);
      canDeğeri -= hasar;
      await targetData.set("profil.CanDeğeri", Math.min(canDeğeri, 100));

      message.channel.send("Attığın hasar zarı" + " " + hasar)
      message.channel.send("Asanı savurarak kılıç kadar keskin rüzgar akımlarını" + " " + `${user ? `${user} ` : ""}` + " " + "adlı kişiye yolladın.");
    } else {
      message.channel.send("Bu büyüyü yapmak için seviyen yetmiyor.")
    }
  }
  if (arg0 == "savur") {
    if (veri.ManaDeğeri <= 24) {
      return message.channel.send("Büyü kullanmak için yeterli mana değerin yok.");
    }
    if (veri.Seviye >= 25 && veri.Seviye <= 100) {
      await kullanıcı.subtract("profil.ManaDeğeri", 25);

      let targetData = kullanıcılar.data(user.id);
      let canDeğeri = await targetData.get("profil.CanDeğeri");
      hasar = randomInteger(1, 20);
      canDeğeri -= hasar;
      await targetData.set("profil.CanDeğeri", Math.min(canDeğeri, 100));

      message.channel.send("Attığın hasar zarı" + " " + hasar)
      message.channel.send("Rüzgara yön vererek" + " " + `${user ? `${user} ` : ""}` + " " + "adlı kişiyi belirttiğin yere doğru savurdun.");
    } else {
      message.channel.send("Bu büyüyü yapmak için seviyen yetmiyor.")
    }
  }

  if (arg0 == "havakesintisi") {
    if (veri.ManaDeğeri <= 49) {
      return message.channel.send("Büyü kullanmak için yeterli mana değerin yok.");
    }
    if (veri.Seviye >= 35 && veri.Seviye <= 100) {
      await kullanıcı.subtract("profil.ManaDeğeri", 50);

      message.channel.send("Rüzgara yön vererek" + " " + `${user ? `${user} ` : ""}` + " " + "adlı kişinin hareket ve eylem hızını yavaşlattın.");
    } else {
      message.channel.send("Bu büyüyü yapmak için seviyen yetmiyor.")
    }
  }
  if (arg0 == "hortum") {
    if (veri.ManaDeğeri <= 69) {
      return message.channel.send("Büyü kullanmak için yeterli mana değerin yok.");
    }
    if (veri.Seviye >= 45 && veri.Seviye <= 100) {
      await kullanıcı.subtract("profil.ManaDeğeri", 70);

      let targetData = kullanıcılar.data(user.id);
      let canDeğeri = await targetData.get("profil.CanDeğeri");
      hasar = randomInteger(1, 40);
      canDeğeri -= hasar;
      await targetData.set("profil.CanDeğeri", Math.min(canDeğeri, 100));

      message.channel.send("Attığın hasar zarı" + " " + hasar)
      message.channel.send("Asanı kullanarak hortuma benzer bir hava akışını canlıların üzerine odakladın.\n" + " " + `${user ? `${user} ` : ""}` + " " + "adlı kişiyi hava akışının sonlandığı yere kadar uzaklaştırırak onun belirttiğin bir yere çarpmasına neden oldu.");
    } else {
      message.channel.send("Bu büyüyü yapmak için seviyen yetmiyor.")
    }
  }
  if (arg0 == "havaküresi") {
    if (veri.ManaDeğeri <= 34) {
      return message.channel.send("Büyü kullanmak için yeterli mana değerin yok.");
    }
    if (veri.Seviye >= 55 && veri.Seviye <= 100) {
      await kullanıcı.subtract("profil.ManaDeğeri", 35);

      let targetData = kullanıcılar.data(user.id);
      let canDeğeri = await targetData.get("profil.CanDeğeri");
      hasar = randomInteger(1, 30);
      canDeğeri -= hasar;
      await targetData.set("profil.CanDeğeri", Math.min(canDeğeri, 100));

      message.channel.send("Attığın hasar zarı" + " " + hasar)
      message.channel.send("Asan ile yönlendirebildiğin güçlü bir hava küresi oluşturdun." + " " + `${user ? `${user} ` : ""}` + " " + "adlı kişinin üstünde basınç ile ezme eylemi gerçekleştirdin.");
    } else {
      message.channel.send("Bu büyüyü yapmak için seviyen yetmiyor.")
    }
  }
};
module.exports.command = {
  commands: ["rüzgar"],
};