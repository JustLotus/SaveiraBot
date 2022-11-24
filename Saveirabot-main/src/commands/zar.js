const Discord = require("discord.js");
const DatabaseManager = require("../managers/DatabaseManager");
const { randomInteger } = require("stuffs");
/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String[]} args
 */
module.exports.execute = async function (client, message, args) {
  let kullanıcılar = DatabaseManager.Database.collection("users");
  let kullanıcı = kullanıcılar.data(message.author.id);

  let veri = await kullanıcı.get("profil");
  if (veri == undefined) {
    return message.reply("Karakter penceresi oluşturmadan bu işlemi yapamazsın.");
  }

  let input = args[0];

  if (input == undefined) {
    return message.channel.send("Atmak istediğin zar sayısını ve sayıyı girmen gerekiyor.")
  }

  let splitedString = input.split("d"); // ["1", "20"]
  let roll = Number(splitedString[0]); // 1
  let interval = Number(splitedString[1]); // 20

  if (isNaN(roll) || roll == 0) {
    return message.channel.send("Bir sayı girmen gerekiyor.")
  }

  if (isNaN(interval) || interval == 0) {
    return message.channel.send("Bir sayı girmen gerekiyor.")
  }

  let rolls = [];
  let extra = 0, syntax;
  if (args[1] && args[1].includes("+") && !isNaN(Number(args[1]))) {
    extra = Number(args[1]);
    syntax = "+";
  }
  else if (args[1] && args[1].includes("-") && !isNaN(Number(args[1]))) {
    extra = Number(args[1]);
    syntax = "-";
  }

  for (let i = 1; i <= roll; i++) {
    let result = randomInteger(1, interval);
    rolls.push(result);
  }

  message.channel.send(`${message.author.username} Roll: [${rolls.join(", ")}] ${extra == 0 ? "" : `${syntax} ${Math.abs(extra)}`} Result: ${rolls.reduce((act, x) => act + x, 0) + extra} `);
}

module.exports.command = {
  commands: ["zar"]
};