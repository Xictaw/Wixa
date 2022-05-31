module.exports = {
	name: 'ready',
	once: true,
    
	execute(client) {
		console.log(`[API]\n Logged in as ${client.user.tag}\n With ${client.user.id} as bot ID\n`);
        
        client.user.setActivity(`/help`, { type: 'LISTENING' });
	},
};