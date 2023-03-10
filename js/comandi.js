const { Collection } = require("discord.js");
const path = require('node:path');
const fs = require('node:fs');

const comandi = new Collection();

const commandsPath = path.join(__dirname, '..', 'comandi');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath).comando;
	if ('data' in command && 'execute' in command) {
		comandi.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

module.exports = comandi;