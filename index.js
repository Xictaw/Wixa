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

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);

	console.log(`Loading Command File : ${file}`);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
	console.log('Command File Loaded ✅\n')
}

client.login(token);