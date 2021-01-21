const Discord = require("discord.js");

module.exports.run = async (_client, message) =>{
    const infoEmbed = new Discord.RichEmbed()
    .setColor("#0CF01D")
    .setAuthor("Informacje o serwerze" + message.guild.name,message.guild.iconURL)
    .addField("ID serwera:", message.guild.id,true)
    .addField("Członkowie:", message.guild.memberCount, true)
    .addField("Kanały:", message.guild.channelCount, true)
    .addField("Właściciel:", message.guild.owner, true)
    .addField("Utworzony:", message.guild.createdAt, true)
    .setTimestamp();

    message.channel.send(infoEmbed);
}

module.exports.help = {
    name: "serverinfo"
}
