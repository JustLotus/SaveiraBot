const Discord = require("discord.js");
const DatabaseManager = require("../managers/DatabaseManager");

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String[]} args
 */
module.exports.execute = async function (client, message, args) {
  let targetMember = message.mentions.members.first() || message.member;

  let kullanıcılar = DatabaseManager.Database.collection("users");
  let kullanıcı = kullanıcılar.data(targetMember.id);

  let veri = await kullanıcı.get("profil");

  await kullanıcı.set("profil.CanDeğeri", Math.max(Math.min(veri.CanDeğeri + veri.MaxCanDeğeri), 0));
  await kullanıcı.set("profil.ManaDeğeri", Math.max(Math.min(veri.ManaDeğeri + veri.MaxManaDeğeri), 0));

  message.channel.send("Bir anda etrafını çevreleyen bir aura ile birlikte kendini her zamankinden daha dinç hissetmeye başladın. ")
}

module.exports.command = {
  commands: ["yenile"]
};
