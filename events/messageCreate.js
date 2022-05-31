module.exports = {
	name: 'messageCreate',
    
	async execute(message) {

	    const command = client.commands.get(message.commandName);

	    if (!command) return;

	    try {
		    await command.execute(message);
	    } catch (error) {
		    console.error(error);
		    await message.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	    }
	},
};