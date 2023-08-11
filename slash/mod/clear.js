const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")
const Discord = require("discord.js")
const config = require("../../config.js")

module.exports = {
  name: 'clear',
  description: 'Clear message.',
  options: [
    {
        name: 'number',
        description: 'Number of message.',
        type: 'NUMBER',
        required: true
      },
    ],
  run: async (client, interaction, args) => {

    const number = interaction.options.getNumber('number');


    if(interaction.member.permissions.has("MANAGE_MESSAGES")){

      if(!isNaN(number) && number >= 1 && number <= 99){
      
        interaction.channel.bulkDelete(number, true).catch(err => interaction.reply({ embeds: [ ], content: "ERROR"}));
  
        const logsChannel = interaction.guild.channels.cache.find(ch => ch.id === config.channelLogsId);
  
        const clearEmbed4 = new Discord.MessageEmbed()
                .setAuthor({
                  name: `🔨 Mod logs`, 
                })
                .setDescription(`
                > You have deleted **${number}** message(s)`)
                .setColor(config.DEFAULTCOLOR)
                .setFooter({
                  text: config.TEXTEMBED,
                  iconURL: config.LOGOURL})
                interaction.reply({ embeds: [clearEmbed4], ephemeral: true})
  


                const logs_embed = new MessageEmbed()
                .setAuthor({
                  name: "🔨 Mod logs",
                  iconURL: config.LOGOURL
                })
                .addFields(
                  { name: "`🛡️` Mods", value: `${interaction.user}`, inline: true},
                  { name: "`📍` Sanction", value: "Clear", inline: true},
                  { name: "`🔧` Channel", value: `${interaction.channel}`, inline: true},
                  { name: "`🔨` Message Deleted", value: `${number}`, inline: true}
                )
                .setColor(config.DEFAULTCOLOR);
                logsChannel.send({ embeds: [logs_embed]})
  
        } else {
            interaction.reply({ embeds: [ ], content: ":x: Put a number between **1** and **99** !", ephemeral: true});
      }
    } else {
      interaction.reply({ embeds: [ ], content: ":x: You can't.", ephemeral: true});
    }
  }
}