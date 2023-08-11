const Discord = require("discord.js");
const { Client, Intents, Collection, MessageActionRow, MessageButton, MessageAttachment, MessageSelectMenu, Permissions } = require('discord.js')
const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_PRESENCES] });
const fs = require("fs");
const { readdirSync } = require("fs");
const config = require("./config.js");
client.config = config;

// -----------------------------------------------------------------------------------------------------------

fs.readdir("./utils/events/discord", (_err, files) => {
	files.forEach(file => {
	  if (!file.endsWith(".js")) return;
	  const event = require(`./utils/events/discord/${file}`);
	  let eventName = file.split(".")[0];
	  console.log(`[Event]   ✅  Loaded: ${eventName}`);
	  client.on(eventName, event.bind(null, client));
	  delete require.cache[require.resolve(`./utils/events/discord/${file}`)];
	});
});

fs.readdir("./utils/events/guild", (_err, files) => {
	files.forEach(file => {
	  if (!file.endsWith(".js")) return;
	  const event = require(`./utils/events/guild/${file}`);
	  let eventName = file.split(".")[0];
	  console.log(`[Event]   ✅  Loaded: ${eventName}`);
	  client.on(eventName, event.bind(null, client));
	  delete require.cache[require.resolve(`./utils/events/guild/${file}`)];
	});
});

// -----------------------------------------------------------------------------------------------------------

client.interactions = new Discord.Collection();
client.register_arr = []

const slashCommandFolders = fs.readdirSync('./slash');

for (const folder of slashCommandFolders) {
    const commandFiles = fs.readdirSync(`./slash/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./slash/${folder}/${file}`);
        let commandName = file.split(".")[0];
        client.interactions.set(commandName, {
          name: commandName,
          ...command
        });
        client.register_arr.push(command)
      }
}


// -----------------------------------------------------------------------------------------------------------


client.login("token");
