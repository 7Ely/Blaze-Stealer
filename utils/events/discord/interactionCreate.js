const Discord = require("discord.js")
const crypto = require('crypto')
const {
    MessageActionRow,
    MessageSelectMenu,
    MessageButton,
    MessageEmbed,
    MessageAttachment
} = require("discord.js");
const config = require("../../../config")
const util = require("util")

module.exports = (client, interaction) => {
    if (interaction.isCommand()) {
        const command = client.interactions.get(interaction.commandName);
        if (!command) return interaction.reply({
            content: "> :x: ERROR !",
            ephemeral: true
        });
        command.run(client, interaction);
    }

    if (interaction.isButton()) {

        // VERIF
        if (interaction.customId === "verif") {
            interaction.guild.members.cache.get(interaction.user.id).roles.remove(config.roleUnverifiedId)
            interaction.message.guild.members.cache.get(interaction.user.id).roles.add(config.roleMemberId)
            interaction.reply({
                content: "> Blaze On Top !",
                ephemeral: true,
                fetchReply: true
            })

        }


        // TICKET 
        else if (interaction.customId === "closeticket") {
            const newembed = new Discord.MessageEmbed()
                .setTitle(`Close ?`)
                .setDescription(`
        > Close the ticket ?`)
                .setColor("#FF0000")
            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                    .setCustomId('yes')
                    .setLabel('Yes')
                    .setStyle('SUCCESS'),
                    new Discord.MessageButton()
                    .setCustomId('no')
                    .setLabel('No')
                    .setStyle('DANGER'),
                );
            interaction.reply({
                embeds: [newembed],
                components: [row]
            })
        } else if (interaction.customId === "yes") {
            interaction.channel.delete();
        } else if (interaction.customId === "no") {
            interaction.message.delete();
        }
    }

    if (interaction.isSelectMenu()) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId('select')
                .setPlaceholder('Choose an option')
                .addOptions([{
                        label: '💡・support',
                        value: 'support-ticket',
                        emoji: '💡',
                    },
                    {
                        label: '💸・buy',
                        value: 'buy-ticket',
                        emoji: '💸',
                    },
                ]),
            )
        const staff = config.roleStaffId;
        if (interaction.values[0] === "support-ticket") {
            interaction.update({
                components: [row]
            })

            interaction.message.guild.channels.create(`support-${crypto.randomBytes(2).toString('hex')}`, {
                permissionOverwrites: [{
                        id: interaction.user.id,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    },
                    {
                        id: staff,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    },
                    {
                        id: interaction.message.guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"]
                    },
                ],
                type: 'text',
                parent: config.categoryTicketId,
            }).then(async channel => {
                const row = new MessageActionRow()
                    .addComponents([
                        new MessageButton()
                        .setLabel('🔒 Close ticket')
                        .setStyle('DANGER')
                        .setCustomId('closeticket'),
                    ])
                const embed2 = new MessageEmbed()
                    .setTitle("Ticket created !")
                    .setDescription(`Describe your [problem](https://www.linguee.fr/anglais-francais/traduction/problem.html).`)
                    .setColor(config.DEFAULTCOLOR)
                channel.send(`${interaction.user}`)
                channel.send({
                    embeds: [embed2],
                    components: [row]
                });
            })



        } else if (interaction.values[0] === "buy-ticket") {

            interaction.update({
                components: [row]
            })

            interaction.message.guild.channels.create(`achat-${crypto.randomBytes(2).toString('hex')}`, {
                permissionOverwrites: [{
                        id: interaction.user.id,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    },
                    {
                        id: staff,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                    },
                    {
                        id: interaction.message.guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"]
                    },
                ],
                type: 'text',
                parent: config.categoryTicketId,
            }).then(async channel => {
                const row = new MessageActionRow()
                    .addComponents([
                        new MessageButton()
                        .setLabel('🔒 Close ticket')
                        .setStyle('DANGER')
                        .setCustomId('closeticket'),
                    ])
                const embed2 = new MessageEmbed()
                .setTitle("Ticket created !")
                .setDescription(`Describe your [problem](https://www.linguee.fr/anglais-francais/traduction/problem.html).`)
                .setColor(config.DEFAULTCOLOR)
                channel.send(`${interaction.user}`)
                channel.send({
                    embeds: [embed2],
                    components: [row]
                });
            })

        }
    }
}