const register = require('../../slashsync');
const mongoose = require("mongoose")

module.exports = async (client) => {
  await register(client, client.register_arr.map((command) => ({
    name: command.name,
    description: command.description,
    options: command.options,
    type: 'CHAT_INPUT'
  })), {
    debug: true
  });
  console.log(`  
  ╔═══════════════════════════════════════╗
           Slash commands loaded ✅       
  ╚═══════════════════════════════════════╝
  
  `)
  console.log(`  
  ╔═══════════════════════════════════════╗
               Bot online ! ✅
  ╚═══════════════════════════════════════╝

  `)
  const activities = ["VisionStealer."];
  setInterval(() => {
    let activity = activities[Math.floor(Math.random() * activities.length)];
    client.user.setActivity(activity, { type: "WATCHING" });
  }, 20000);
};
