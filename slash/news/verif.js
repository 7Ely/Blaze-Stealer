const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton, MessageAttachment, Intents } = require("discord.js");
const config = require("../../config")
const img = new MessageAttachment('verif.gif')

module.exports = {
    name: 'verif',
    description: 'Rules.',
    run: async (client, interaction) => {

        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "> :x: You can't", ephemeral: true})

        const embed = new MessageEmbed()
        .setTitle("Captcha")
        .setDescription(`
        > Welcome to VisionStealer. please solve the verification`)
        
        .setImage('attachment://verif.gif')
        .setColor(config.DEFAULTCOLOR)
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel("Robot ?")
            .setCustomId("verif")
            .setStyle("SUCCESS")
            .setEmoji("<:bot:1033506819328454798>"),
        );    

        interaction.reply({ content : ` Sent !`, ephemeral: true});

        interaction.channel.send({ embeds: [embed], components: [row], files: [img] })

    }
}
