const Discord = require("discord.js");
var fs = require("fs");
const config = require("./config.json");

const client = new Discord.Client();

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) =>{
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");

    if(jsfile.length <= 0){
        console.log("Folder ./commands/ jest pusty!");
    }

    jsfile.forEach((f) =>{
        let props = require(`./commands/${f}`);
        client.commands.set(props.help.name,props)
    })
})


client.on("ready",() => { 
    console.log("Jestem gotowy!")
    client.user.setActivity("Miłego dnia",{type: 'PLAYING'});
})

client.on("message", async message =>{
    if(message.content === "/ping")return message.channel.send("Pong!");

    let prefix = config.prefix;
    if(!message.content.startsWith(prefix)) return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(client,message,args);
});


client.login(config.token);
