const { MessageButton, MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js")
const config = require("../../config.js")

module.exports = {
  name: 'ticket-add',
  description: 'Add a member to the ticket.',
  options: [
    {
        name: 'member',
        description: 'Choose a user.',
        type: 'USER',
        required: true
      },
  ],
  run: async (client, interaction, args) => {

    const member = interaction.options.getUser('member');

    if (!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({ content: "> :x: You can't", ephemeral: true})

    if(interaction.channel.name.includes('support') || interaction.channel.name.includes('buy')) {
				interaction.channel.permissionOverwrites.edit(member, {
					VIEW_CHANNEL: true,
					SEND_MESSAGES: true,
					ATTACH_FILES: true,
					READ_MESSAGE_HISTORY: true,
				}).then(() => {
          const embed = new MessageEmbed()
          .setTitle(`<:checked:1027633423617110099> Success !`)
          .setDescription(`> The member ${member} as been added successfully !`)
          .setColor(config.DEFAULTCOLOR)
          .setFooter({ text: config.TEXTEMBED, iconURL: config.LOGOURL})
          .setTimestamp()
					interaction.reply({ embeds: [embed]});
				});
		} else {
      const embed_err = new MessageEmbed()
      .setTitle(`<:warn:1027633562100432896> Error`)
      .setDescription(`> Not here !`)
      .setColor("RED")
      .setFooter({ text: config.TEXTEMBED, iconURL: config.LOGOURL})
      .setTimestamp()
      interaction.reply({ embeds: [embed_err], ephemeral: true});
    }

  }
}