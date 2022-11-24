const Discord = require("discord.js");
const DatabaseManager = require("../managers/DatabaseManager");
const { createCanvas, loadImage } = require("canvas");
const path = require("path");
const { percent } = require("stuffs");

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {String[]} args
 */
module.exports.execute = async function (client, message, args) {
    let targetMember = message.mentions.members.first() || message.member;

    let kullanıcılar = DatabaseManager.Database.collection("users");
    let kullanıcı = kullanıcılar.data(message.author.id);

    let veri = await kullanıcı.get("profil");
    if (veri == undefined) {
        message.reply("ilk önce karakter penceresi oluşturmalısın. Oluştur komutu kullan.");
        return;
    }

    if (veri.CanDeğeri < 0) {
        veri.CanDeğeri = 0;
        kullanıcı.set("profil", veri);
    }

    if (veri.ManaDeğeri < 0) {
        veri.ManaDeğeri = 0;
        kullanıcı.set("profil", veri);
    }

    if (veri.CanDeğeri > 100) {
        veri.CanDeğeri = 100;
        kullanıcı.set("profil", veri);
    }

    if (veri.ManaDeğeri > 100) {
        veri.ManaDeğeri = 100;
        kullanıcı.set("profil", veri);
    }

    let canvas = createCanvas(300, 410);
    let ctx = canvas.getContext("2d");

    let bgImg = await loadImage(path.resolve("./media/profilBg.png"));

    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#D5B698";
    ctx.font = `31px 'Trebuchet MS'`;
    let titleWidth = ctx.measureText("STATLARIM").width;
    ctx.fillText("STATLARIM", canvas.width / 2 - titleWidth / 2, 40);

    ctx.font = `20px 'Trebuchet MS'`;

    let başlangıçBoyut = 60;
    let ekleyen = 20;

    ctx.fillText(`Kuvvet: ${veri.Kuvvet}`, 17, başlangıçBoyut += ekleyen) // veri alacak 

    ctx.fillText(`Zeka: ${veri.Zeka}`, 17, başlangıçBoyut += ekleyen)

    ctx.fillText(`Çeviklik: ${veri.Çeviklik}`, 17, başlangıçBoyut += ekleyen)

    ctx.fillText(`Dayanıklılık: ${veri.Dayanıklılık}`, 17, başlangıçBoyut += ekleyen)

    ctx.fillText(`Ünvan: ${veri.Ünvan}`, 17, başlangıçBoyut += ekleyen)

    ctx.fillText(`Can Değeri: ${veri.CanDeğeri}/${veri.MaxCanDeğeri}`, 17, başlangıçBoyut += ekleyen + 10)

    let yasamBarY = başlangıçBoyut += ekleyen + 10;
    ctx.fillStyle = "#00000090";
    ctx.fillRect(17, yasamBarY, canvas.width - 27 * 2, 16);
    ctx.fillStyle = "#AA3131";
    ctx.fillRect(17, yasamBarY, percent(veri.CanDeğeri, veri.MaxCanDeğeri, canvas.width - 27 * 2), 16);

    ctx.fillStyle = "#D5B698";
    ctx.fillText(`Mana Değeri: ${veri.ManaDeğeri}/${veri.MaxManaDeğeri}`, 17, başlangıçBoyut += ekleyen)

    let manaBarY = başlangıçBoyut += ekleyen + 10
    ctx.fillStyle = "#00000090";
    ctx.fillRect(17, manaBarY, canvas.width - 27 * 2, 16);
    ctx.fillStyle = "#338FA8";
    ctx.fillRect(17, manaBarY, percent(veri.ManaDeğeri, veri.MaxManaDeğeri, canvas.width - 27 * 2), 16);

    ctx.fillStyle = "#D5B698";

    let seviyeVeParaX = başlangıçBoyut += ekleyen + 10;
    ctx.fillText(`Seviye: ${veri.Seviye}`, 17, seviyeVeParaX);
    ctx.fillText(`Para: ${veri.Para}`, 160, seviyeVeParaX);
    ctx.fillText(`Statü: ${veri.Statü}`, 17, başlangıçBoyut += ekleyen + 5);

    message.channel.send(new Discord.MessageAttachment(canvas.toBuffer(), "profil.png"));
    canvas = 0;
    ctx = 0;
};
//Buradaki karakteri @ 

module.exports.command = {
    commands: ["profil"]
};
