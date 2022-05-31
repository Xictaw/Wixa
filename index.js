const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const { stdout } = require('node:process');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);

	console.log(`Loading Events File : ${file}`);
	const event = require(filePath);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
		console.log('Event File Binded Once ✅\n');
	} else {
		client.on(event.name, (...args) => event.execute(...args));
		console.log('Event File Binded ✅\n');
	}
}

const commandFoldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandFoldersPath);

for (const folder of commandFolders) {
	const commandsFilesPath = path.join(commandFoldersPath, folder);
    const commandFiles = fs.readdirSync(commandsFilesPath).filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles) {
	    const filePath = path.join(commandsFilesPath, file);

		console.log(`Loading Command File : ${file}`);
	    const command = require(filePath);
        
	    client.commands.set(command.data.name, command);
		console.log('Command File Loaded ✅\n')
    }
}

client.login(token);