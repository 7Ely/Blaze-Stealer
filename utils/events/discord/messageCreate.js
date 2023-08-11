const config = require("../../../config")
const Discord = require("discord.js")

module.exports = (client, message, member) => {
    if (message.author.bot) return
    if (message.channel.id === config.channelSuggestId) {
        message.delete()
        const suggestChanel = message.guild.channels.cache.find(ch => ch.id === config.channelSuggestId);
        const embed = new Discord.MessageEmbed()
            .setTitle(`📌 Survey from ${message.author.username}`)
            .addFields({
                name: "Survey:",
                value: `${message.content}`
            })
            .setThumbnail(message.author.displayAvatarURL({
                dynamic: true,
                size: 1024
            }))
            .setColor(config.DEFAULTCOLOR)
            .setFooter({
                text: config.TEXTEMBED,
                iconURL: config.iconURL
            });
        suggestChanel.send({
            embeds: [embed]
        }).then(async (msg) => {
            msg.react("✅");
            msg.react("➖");
            msg.react("❌");
        })
    }


    // ---------------------------------------------------------------------------------------------------------------------------------------------------
    //                                       AUTO-MOD
    // ---------------------------------------------------------------------------------------------------------------------------------------------------

    if (message.content.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g)) || message.content.includes('discord.gg')) {
        if (message.content.match("https://tenor.com/") || message.content.match("https://media.discordapp.net/") || message.content.match("https://cdn.discordapp.com/")) return;
        if (message.member.permissions.has("ADMINISTRATOR")) return;
        message.delete()

        const member = message.author;

        member.send({
            content: `> Warning ${message.author}, link are not accepted !`,
            ephemeral: true
        }).catch(err => message.channel.send({
            content: `> Warning ${message.author}, keep active your dms !`
        }));

        const logsChannel = message.guild.channels.cache.find(ch => ch.id === config.channelLogsId);
        const embed = new Discord.MessageEmbed()
            .setAuthor({
                name: `🔨 Logs`,
                iconURL: `${config.LOGOURL}`
            })
            .addFields({
                name: "`👤` Member",
                value: `${message.author}`,
                inline: true
            }, {
                name: "`📍` Action",
                value: "Auto-Mod (Pub)",
                inline: true
            }, {
                name: "`🔨` Message deleted",
                value: `${message.content}`,
                inline: false
            })
            .setColor(config.DEFAULTCOLOR)
        logsChannel.send({
            embeds: [embed]
        })

    }

    let blacklisted = config.flagWordlist;
    let textOk = false;
    for (var i in blacklisted) {
        if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) textOk = true;
    }
    if (textOk) {

        message.delete();

        const member = message.author;

        member.send(`> Warning ${message.author}, one word in your sentence is not allowed !`).catch(err => message.channel.send({
            content: `> Warning ${message.author}, keep active your dms !`
        }));

        const logsChannel = message.guild.channels.cache.find(ch => ch.id === config.channelLogsId);
        const embed = new Discord.MessageEmbed()
            .setAuthor({
                name: `🔨 Logs`,
                iconURL: `${config.LOGOURL}`
            })
            .addFields({
                name: "`👤` Member",
                value: `${message.author}`,
                inline: true
            }, {
                name: "`📍` Action",
                value: "Auto-Mod (Pub)",
                inline: true
            }, {
                name: "`🔨` Message deleted",
                value: `${message.content}`,
                inline: false
            })
            .setColor(config.DEFAULTCOLOR)
        logsChannel.send({
            embeds: [embed]
        })
    }
}