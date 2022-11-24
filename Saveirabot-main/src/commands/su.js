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

  if (user == undefined) {
    message.reply("Bir hedef belirtmen gerekiyor!");
    return;
  }

  // BURASI SU BÜYÜSÜ İÇİNDİR

  if (message.member.roles.cache.has("861217445695324189") == false) {
    return message.reply("Su büyüsünü yapabilmek için öğrenmen gerekiyor.");
  }

  let arg0 = String(args[0]).toLowerCase();

  if (arg0 == "plazmatopu") {
    if (veri.ManaDeğeri <= 29) {
      return message.channel.send("Büyü kullanmak için yeterli mana değerin yok.");
    }
    if (veri.Seviye >= 15 && veri.Seviye <= 100) {
      await kullanıcı.subtract("profil.ManaDeğeri", 30);

      let targetData = kullanıcılar.data(user.id);
      let canDeğeri = await targetData.get("profil.CanDeğeri");
      hasar = randomInteger(1, 25);
      canDeğeri -= hasar;
      await targetData.set("profil.CanDeğeri", Math.min(canDeğeri, 100));

      message.channel.send("Attığın zar" + " " + hasar)
      message.channel.send("Asandan" + " " + `${user ? `${user} ` : ""}` + " " + "adlı kişiye sudan oluşan bir plazma topu fırlattın.");
    } else {
      message.channel.send("Bu büyüyü yapmak için seviyen yetmiyor.")
    }
  }
  if (arg0 == "suçivisi") {
    if (veri.ManaDeğeri <= 9) {
      return message.channel.send("Büyü kullanmak için yeterli mana değerin yok.")
    }
    if (veri.Seviye >= 25 && veri.Seviye <= 100) {
      await kullanıcı.subtract("profil.ManaDeğeri", 10);

      let targetData = kullanıcılar.data(user.id);
      let canDeğeri = await targetData.get("profil.CanDeğeri");
      hasar = randomInteger(1, 10);
      canDeğeri -= hasar;
      await targetData.set("profil.CanDeğeri", Math.min(canDeğeri, 100));

      message.channel.send("Attığın hasar zarı" + " " + hasar)
      message.channel.send("Asandan ufak ucu sivri bir su çivisi çıkararak" + " " + `${user ? `${user} ` : ""}` + " " + "adlı kişiye fırlattın.");
    } else {
      message.channel.send("Bu büyüyü yapmak için seviyen yetmiyor.")
    }
  }
  if (arg0 == "sukamçısı") {
    if (veri.ManaDeğeri <= 44) {
      return message.channel.send("Büyü kullanmak için yeterli mana değerin yok.")
    }
    if (veri.Seviye >= 35 && veri.Seviye <= 100) {
      await kullanıcı.subtract("profil.ManaDeğeri", 45);

      let targetData = kullanıcılar.data(user.id);
      let canDeğeri = await targetData.get("profil.CanDeğeri");
      hasar = randomInteger(1, 30);
      canDeğeri -= hasar;
      await targetData.set("profil.CanDeğeri", Math.min(canDeğeri, 100));

      message.channel.send("Attığın hasar zarı" + " " + hasar)
      message.channel.send("Asanı kullanarak bir miktar su çıkardın ve " + " " + `${user ? `${user} ` : ""}` + " " + "adlı kişiye suyu savurarak onu yere çarptın. \n " + `${user ? `${user} ` : ""}` + "(Adlı oyuncu bir tur boyunca hareket edemeyecektir.)");
    } else {
      message.channel.send("Bu büyüyü yapmak için seviyen yetmiyor.")
    }
  }
  if (arg0 == "ıslakvuruş") {
    if (veri.ManaDeğeri <= 74) {
      return message.channel.send("Büyü kullanmak için yeterli mana değerin yok.")
    }
    if (veri.Seviye >= 45 && veri.Seviye <= 100) {
      await kullanıcı.subtract("profil.ManaDeğeri", 75);

      let targetData = kullanıcılar.data(user.id);
      let canDeğeri = await targetData.get("profil.CanDeğeri");
      hasar = randomInteger(1, 50);
      canDeğeri -= hasar;
      await targetData.set("profil.CanDeğeri", Math.min(canDeğeri, 100));

      message.channel.send("Attığın hasar zarı" + " " + hasar)
      message.channel.send("Asanı kullanarak sudan oluşan büyük bir el oluşturdun ve" + " " + `${user ? `${user} ` : ""}` + " " + "adlı kişiyi yere çarptın. \n" + `${user ? `${user} ` : ""}` + "(Adlı oyuncu bir tur boyunca baygın kalacaktır.)");
    } else {
      message.channel.send("Bu büyüyü yapmak için seviyen yetmiyor.")
    }
  }

};
module.exports.command = {
  commands: ["su"],
};
