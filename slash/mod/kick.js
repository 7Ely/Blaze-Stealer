const { MessageButton, MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js")
const config = require("../../config.js")
const moment = require("moment")

module.exports = {
  name: 'kick',
  description: 'Kick a member.',
  options: [
    {
        name: 'user',
        description: 'Choose a member.',
        type: 'USER',
        required: true
      },
    {
        name: 'reason',
        description: 'Give a reason',
        type: 'STRING',
        required: true
    }
    ],
  run: async (client, interaction, args) => {

    var reason = interaction.options.getString('reason');
    const member = interaction.options.getMember('user');
    const memberid = member.user.id;


    if (!interaction.member.permissions.has("KICK_MEMBERS")) return interaction.reply({ content: "> :x: You can't", ephemeral: true})
    if(member.permissions.has("KICK_MEMBERS")) return interaction.reply({ content: "> :x: You can't**", ephemeral: true})


    const embed = new MessageEmbed()
    .setAuthor({
        name: "🔨 Wait a minute...",
        iconURL: config.iconURL
      })
      .addFields(
        { name: "`👤` User", value: `${member}`, inline: true},
        { name: "`🆔` ID", value: `${memberid}`, inline: true},
      )
      .addFields(
        { name: "`📍` Sanction", value: `Kick`, inline: true},
        { name: "`🔧` Reason", value: `${reason}`, inline: true},
        { name: "`🗓️` Date", value: `${new Date(interaction.createdTimestamp).toLocaleString('en-US')}`, inline: true},
      )
      .setColor(config.DEFAULTCOLOR);
      const row = new MessageActionRow()
                        .addComponents([
                          new MessageButton()
                                .setLabel('Yes')
                                .setStyle('SUCCESS')
                                .setCustomId('yes-kick'),
                          new MessageButton()
                                .setLabel('No')
                                .setStyle('DANGER')
                                .setCustomId('no-kick'),
                        ])

      const message = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true, ephemeral: true})

      const filter = (interaction) => interaction.user.id;

      const collector = message.createMessageComponentCollector(
          {
              filter,
          });

      collector.on('collect', async i => {
          if (i.customId === 'yes-kick') {

            const logsChannel = interaction.guild.channels.cache.find(ch => ch.id === config.channelLogsId);

            const embed = new MessageEmbed()
            .setAuthor({
              name: `🔨 Wait a minute...`, 
              iconURL: `${config.LOGOURL}`})
              .addFields(
                { name: "`👤` User", value: `${member}`, inline: true},
                { name: "`🆔` ID", value: `${memberid}`, inline: true},
              )
              .addFields(
                { name: "`📍` Sanction", value: `Kick`, inline: true},
                { name: "`🔧` Reason", value: `${reason}`, inline: true},
                { name: "`🗓️` Date", value: `${new Date(interaction.createdTimestamp).toLocaleString('en-US')}`, inline: true},
              )
              .setColor(config.DEFAULTCOLOR)
              await i.update({ embeds: [embed], content: "Oof !", components: [ ], fetchReply: true})

              const embed_logs = new MessageEmbed()
              .setAuthor({
                name: "🔨 Kicked",
                iconURL: `${config.LOGOURL}`})
              .addFields(
                { name: "`👤` User", value: `${member}`, inline: true},
                { name: "`🛡️` Modérateur", value: `${interaction.user}`, inline: true},
              )
              .addFields(
                { name: "`📍` Sanction", value: `Kick`, inline: true},
                { name: "`🔧` Reason", value: `${reason}`, inline: true},
                { name: "`🗓️` Date", value: `${new Date(interaction.createdTimestamp).toLocaleString('en-US')}`, inline: true},
              )
              .setColor(config.DEFAULTCOLOR)
              logsChannel.send({ embeds: [embed_logs]})

              member.kick({ reason: reason})



          } else if(i.customId === "no-kick"){
            const embed = new MessageEmbed()
            .setAuthor({
              name: `🔨 Canceled`, 
              iconURL: `${config.LOGOURL}`})
              .setDescription(`
              :x: You have cancelled this action.`)
              .setColor("#36393F")
            await i.update({ content: " ", components: [], embeds: [embed], fetchReply: true }).catch(err => console.log(`${err}`))
            .then(() => {
              setTimeout(function(){
                i.message.delete()
              }, 3000);
            })
          }
      })


  }
}