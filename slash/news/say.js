const { MessageButton, MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js")
const config = require("../../config.js")

module.exports = {
  name: 'say',
  description: 'Say.',
  options: [
    {
        name: 'text',
        description: 'Type somethings.',
        type: 'STRING',
        required: true
      },
  ],
  run: async (client, interaction, args) => {

    const member = interaction.options.getString('text');

    if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "> :x: You can't", ephemeral: true})

    interaction.reply({ content: "Sent", ephemeral: true})
    interaction.channel.send({ content: `${member}`})


  }
}