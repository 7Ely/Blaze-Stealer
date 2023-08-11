const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  MessageButton
} = require("discord.js")
const Discord = require("discord.js")
const config = require("../../config.js")

module.exports = {
  name: 'tickets',
  description: 'Ticket',
  run: async (client, interaction) => {

      if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({
          content: "> :x: You can't",
          ephemeral: true
      })

      const embed = new MessageEmbed()
          .setTitle(`Tickets`)
          .setDescription(`Choose an option :`)
          .addFields({
              name: "💡- Support",
              value: "If you have a problem with our services.",
              inline: false
          }, {
              name: "💸 - Buy",
              value: "If you wtb VisionStealer.",
              inline: false
          })
          .setColor(config.DEFAULTCOLOR)
          .setFooter({
              text: config.TEXTEMBED,
              iconURL: config.LOGOURL
          })

      const row = new MessageActionRow()
          .addComponents(
              new MessageSelectMenu()
              .setCustomId('select')
              .setPlaceholder('Select an option')
              .addOptions([{
                      label: '・support',
                      value: 'support-ticket',
                      emoji: '💡',
                  },
                  {
                      label: '・buy',
                      value: 'achat-ticket',
                      emoji: '💸',
                  },
              ]),
          )

      interaction.reply({
          content: ` Sent !`,
          ephemeral: true
      });

      interaction.channel.send({
          embeds: [embed],
          components: [row]
      });

  }
}