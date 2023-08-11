const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageAttachment, Intents } = require("discord.js");
const config = require("../../config")
const moment = require("moment")
require("moment-duration-format");
const { mem, cpu, os } = require('node-os-utils');

module.exports = {
    name: 'botinfo',
    description: 'Bot Infos.',
    run: async (client, interaction) => {

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        const embed = new MessageEmbed()
        .setAuthor({name: "┃ BOT INFOS", iconURL: "https://cdn.discordapp.com/attachments/1135320957070868632/1135578933933387878/image.png"})
        .addFields(
            {name: "> Name :", value: `${client.user.username} \n (\`${client.user.tag}\`)`, inline: true},
            {name: "> ID : ", value: `\`${config.ID}\``, inline: true},
            {name: "> Uptime : ", value: `**${days}** j | **${hours}** h | **${minutes}** m | **${seconds}** s`, inline: true},
            {name: "> Dev : ", value: "VisionInc.", inline: true}
            )
        .setThumbnail(`${client.user.displayAvatarURL({dynamic: true})}`)
        .setFooter({text: `© 2023 VisionInc. - All right reserved`, iconURL: `${client.user.displayAvatarURL({dynamic: true})}`})
        .setTimestamp()
        .setColor("0xFF001A")

        interaction.reply({embeds: [embed]})

    }
}