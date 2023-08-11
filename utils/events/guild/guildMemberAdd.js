const { MessageAttachment, MessageEmbed } = require("discord.js")
const { channelWelcomeId } = require("../../../config")
const config = require("../../../config")

module.exports = async (client, member) => {
    
    const channel = member.guild.channels.cache.find(ch => ch.id === channelWelcomeId);
    if (!channel) return console.log("Error with welcome channel, verify id.");

      let wembed = new MessageEmbed()
      .setTitle(`Welcome ${member.user.username} on 🔥| Vision E-Sport Team.`)
      .setDescription(`We are now **${member.guild.memberCount}** members`)
      .setThumbnail(`${member.user.displayAvatarURL()}`)
    .setColor(config.DEFAULTCOLOR)
    channel.send({embeds: [wembed] });
}