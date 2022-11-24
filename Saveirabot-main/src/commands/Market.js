const Discord = require("discord.js");
const DatabaseManager = require("../managers/DatabaseManager");
let items = require("../items");
const { Console } = require("console");

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String[]} args
 */
module.exports.execute = async function (client, message, args) {

  let kullanıcılar = DatabaseManager.Database.collection("users");
  let kullanıcı = kullanıcılar.data(message.author.id);
  let user = message.member

  let veri = await kullanıcı.get("profil");
  if (veri == undefined) {
    return message.reply("Karakter penceresi oluşturmadan bu işlemi yapamazsın.");
  }

  // 2 12 8

  let arg0 = String(args[0]).toLowerCase()

  if (arg0 == "listele") {
    let page = 1;
    let yazı = items.slice(page * 10 - 10, page * 10).map(item => {
      return `\` ${item.id.padEnd(2)} | ${item.name.padEnd(22)} | ${`${item.price}₺`.padEnd(8)} | ${`${item.tür}`} \``;
    }).join("\n");
    let embed = new Discord.MessageEmbed();
    embed.setTitle(`\` ID | İsim               | Fiyat   | TÜR\``);
    embed.setDescription(yazı);
    embed.setColor("RANDOM");
    message.channel.send(embed).then(async function (msg) {
      await msg.react('⏪')
      await msg.react('⏩')

      const filter = (reaction, user) => (reaction.emoji.name === '⏩' || reaction.emoji.name === '⏪') && user.id === message.author.id;
      const pagenation = msg.createReactionCollector(filter, { time: 100000 });
      pagenation.on('collect', (r) => {
        if (r.emoji.name == "⏩") {
          if (page + 1 >= 6) return;
          page += 1;
        }
        else if (r.emoji.name == "⏪") {
          if (page - 1 <= 0) return;
          page -= 1;
        }

        yazı = items.slice(page * 10 - 10, page * 10).map(item => {
          return `\` ${item.id.padEnd(2)} | ${item.name.padEnd(22)} | ${`${item.price}`.padEnd(8)} | ${`${item.tür}`} \``;
        }).join("\n");

        embed.setDescription(yazı);
        embed.setFooter(`Bulunduğun sayfa: ${page}`);
        msg.edit(embed)
      })
    })
  }

  if (args[0] == "buy") {
    items.map(item => {
      if (args[1] == item.id) {
        if (veri.Para < item.price) {
          message.channel.send("Bu eşyayı satın almak için yeterli paran yok.")
          return;
        }

        if (veri.Para >= item.price) {
          user.roles.add(item.rol)

          kullanıcı.subtract("profil.Para", item.price);
          message.channel.send(item.name + " " + "Adlı eşyayı satın aldın")
        }
      }
    })
  }
};
module.exports.command = {
  commands: ["market"]
};