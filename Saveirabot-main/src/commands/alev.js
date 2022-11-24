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
    return message.reply("Karakter penceresi oluşturmadan bu işlemi gerçekleştiremezsin.");
  }

  if (user == undefined) {
    message.reply("Bir hedef belirtmen gerekiyor!");
    return;
  }

  // BURASI ALEV BÜYÜSÜ İÇİNDİR

  if (message.member.roles.cache.has("861217445695324190") == false) {
    return message.reply("Ateş büyülerini yapabilmek için öğrenmen gerekiyor.");
  }

  let arg0 = String(args[0]).toLowerCase();

  let hasar = 0

  if (arg0 == "ateşinhissi") {
    if (veri.ManaDeğeri <= 14) {
      return message.channel.send(
        "Büyü kullanmak için yeterli mana değerin yok."
      );
    }
    if (veri.Seviye >= 5 && veri.Seviye <= 100) {
      await kullanıcı.subtract("profil.ManaDeğeri", 15);
      message.channel.send("Yanan bir alev kaynağını yönlendirmeye başladın.");
    } else {
      message.channel.send("Bu büyüyü yapmak için seviyen yetmiyor.")
    }
  }
  if (arg0 == "ateştopu") {
    if (veri.ManaDeğeri <= 24) {
      return message.channel.send("Büyü kullanmak için yeterli mana değerin yok.");
    }
    if (veri.Seviye >= 15 && veri.Seviye <= 100) {
      await kullanıcı.subtract("profil.ManaDeğeri", 25);

      let targetData = kullanıcılar.data(user.id);
      let canDeğeri = await targetData.get("profil.CanDeğeri");
      hasar = randomInteger(1, 13);
      canDeğeri -= hasar;
      await targetData.set("profil.CanDeğeri", Math.min(canDeğeri, 100));

      message.channel.send("Attığın hasar zarı" + " " + hasar)
      message.channel.send("Asanın ucunda ufak bir ateş topu oluşturup" + " " + `${user ? `${user} ` : ""}` + " " + "adlı kişiye fırlattın.");
    } else {
      message.channel.send("Bu büyüyü yapmak için seviyen yetmiyor.")
    }
  }
  if (arg0 == "alevtopu") {
    if (veri.ManaDeğeri <= 49) {
      return message.channel.send("Büyü kullanmak için yeterli mana değerin yok.");
    }
    if (veri.Seviye >= 25 && veri.Seviye <= 100) {
      await kullanıcı.subtract("profil.ManaDeğeri", 50);

      let targetData = kullanıcılar.data(user.id);
      let canDeğeri = await targetData.get("profil.CanDeğeri");
      hasar = randomInteger(1, 28);
      canDeğeri -= hasar;
      await targetData.set("profil.CanDeğeri", Math.min(canDeğeri, 100));

      message.channel.send("Attığın hasar zarı" + " " + hasar)
      message.channel.send("Asanın ucunda büyük bir ateş topu oluşturup" + " " + `${user ? `${user} ` : ""}` + " " + "adlı kişiye fırlattın.");
    } else {
      message.channel.send("Bu büyüyü yapmak için seviyen yetmiyor.")
    }
  }
  if (arg0 == "alevçemberi") {
    if (veri.ManaDeğeri <= 54) {
      return message.channel.send("Büyü kullanmak için yeterli mana değerin yok.");
    }
    if (veri.Seviye >= 35 && veri.Seviye <= 100) {
      await kullanıcı.subtract("profil.ManaDeğeri", 55);

      let targetData = kullanıcılar.data(user.id);
      let canDeğeri = await targetData.get("profil.CanDeğeri");
      hasar = randomInteger(1, 30);
      canDeğeri -= hasar;
      await targetData.set("profil.CanDeğeri", Math.min(canDeğeri, 100));

      message.channel.send("Attığın hasar zarı" + " " + hasar)
      message.channel.send("Asanı kullanarak" + " " + `${user ? `${user} ` : ""}` + " " + "altında patlayan bir alev çemberi oluşturdun.");
    } else {
      message.channel.send("Bu büyüyü yapmak için seviyen yetmiyor.")
    }
  }
  if (arg0 == "alevmızrağı") {
    if (veri.ManaDeğeri <= 89) {
      return message.channel.send("Büyü kullanmak için yeterli mana değerin yok.");
    }
    if (veri.Seviye >= 45 && veri.Seviye <= 100) {
      await kullanıcı.subtract("profil.ManaDeğeri", 90);

      let targetData = kullanıcılar.data(user.id);
      let canDeğeri = await targetData.get("profil.CanDeğeri");
      hasar = randomInteger(1, 50);
      canDeğeri -= hasar;
      await targetData.set("profil.CanDeğeri", Math.min(canDeğeri, 100));

      message.channel.send("Attığın hasar zarı" + " " + hasar)
      message.channel.send("Asandan bir alev mızrağı çıkartarak" + " " + `${user ? `${user} ` : ""}` + " " + "adlı kişiye fırlattın.");
    } else {
      message.channel.send("Bu büyüyü yapmak için seviyen yetmiyor.")
    }
  }
  if (arg0 == "plazmapatlaması") {
    if (veri.ManaDeğeri <= 74) {
      return message.channel.send("Büyü kullanmak için yeterli mana değerin yok.");
    }
    if (veri.Seviye >= 55 && veri.Seviye <= 100) {
      await kullanıcı.subtract("profil.ManaDeğeri", 75);

      let targetData = kullanıcılar.data(user.id);
      let canDeğeri = await targetData.get("profil.CanDeğeri");
      hasar = randomInteger(1, 40);
      canDeğeri -= hasar;
      await targetData.set("profil.CanDeğeri", Math.min(canDeğeri, 100));

      message.channel.send("Attığın hasar zarı" + " " + hasar)
      message.channel.send("Asanın ucundan bir alev plazması çıkararak" + " " + `${user ? `${user} ` : ""}` + " " + "adlı kişiye doğru fırlattın.");
    } else {
      message.channel.send("Bu büyüyü yapmak için seviyen yetmiyor.")
    }
  }
};
module.exports.command = {
  commands: ["alev"],
};
