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


  message.channel.send(
    new Discord.MessageEmbed()
      .setTitle('Bot Komutları')
      .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'Market komutları:', value: '``.market listele | .market buy id``' },
        { name: 'Büyü komutları:', value: '``.alev | .şifa | .su | .rüzgar``' },
        { name: 'Genel komutlar:', value: '``.profil | .zar | .gönder``' },
        { name: 'Admin komutları:', value: '``.sil | .ekle``' },
      )
      .setImage('https://i.hizliresim.com/7yt50c6.png')
  );
}
module.exports.command = {
  commands: ["help"],
};