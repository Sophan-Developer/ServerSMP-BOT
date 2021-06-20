const { MessageEmbed, Message, Client } = require('discord.js');
const schema = require('../../models/cc');
const premium = require('../../models/premium');

module.exports = {
    name: 'cc-create',
    category : 'Custom Commands',
    usage: '[name] [what it do]',
    description : "Create custom commands!",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const premiumdata = await premium.findOne({ Guild: message.guild.id });
        if(!premiumdata) return message.reply('This guild does not have premium!');
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have permissions to use this command');

        const name = args[0]; const response = args.slice(1).join(" ");

        if(!name) return message.channel.send('Please specify a command name');
        if(!response) return message.channel.send('Please specify a response');

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(data) return message.channel.send('This custom commands exists already!');
        const newData =  new schema({
            Guild: message.guild.id,
            Command: name,
            Response: response
        })
        await newData.save();
        message.channel.send(`Saved **${name}** as a custom command!`);
    }
}