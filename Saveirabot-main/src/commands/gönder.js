const Discord = require("discord.js");
const DatabaseManager = require("../managers/DatabaseManager");

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String[]} args
 */
module.exports.execute = async function (client, message, args) {


  let kullanıcılar = DatabaseManager.Database.collection("users");
  let targetMember = kullanıcılar.data(message.mentions.members.first().id);
  let kullanıcı = kullanıcılar.data(message.author.id);

  let veri = await kullanıcı.get("profil");
  if (veri == undefined) {
    return message.reply("Karakter penceresi oluşturmadan bu işlemi yapamazsın.");
  }

  let arg0 = args[0]
  let sayı = Number(args[1])

  if (isNaN(sayı)) {
    return message.reply("Lütfen geçerli bir sayı giriniz.");
  }

  if (veri.Para <= sayı) {
    return message.channel.send("Paran yok lan fakir. Ağızın kokuyor ağızın.")
  }

  if (arg0 == "para") {
    await kullanıcı.subtract("profil.Para", sayı)
    await targetMember.add("profil.Para", sayı)
    message.channel.send("Başarılı bir şekilde fakir arkadaşa para yolladın.")
  }
}
module.exports.command = {
  commands: ["gönder"]
};