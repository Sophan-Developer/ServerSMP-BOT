const Client = require('../index');
const db = require('../models/reaconDB');

Client.on("guildMemberAdd", async(member) => {
    const check = await db.has(`autorole-${member.guild.id}`);
    if(check === true) {
        member.roles.add(await db.get(`autorole-${member.guild.id}`))
    };
})