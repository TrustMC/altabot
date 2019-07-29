const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require ("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();



fs.readdir("./commands/", (err, files) => {

  if(err) console.log (err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});


bot.on("ready", async () => {
  console.log(`${bot.user.username} is online! CONGRATS`);
  bot.user.setActivity("ALL FINISHED", {type: "WATCHING"});
});

  bot.on("guildMemberAdd", async member => {
    console.log(`${member.id} joined the server`);

    let welcomechannel = member.guild.channels.find('name', "welcome-leave");
    welcomechannel.send(`Look out everyone! ${member} has joined the party!`);
  })

  bot.on("guildMemberRemove", async member => {

    console.log(`${member.id} left the server`);

    let welcomechannel = member.guild.channels.find('name', "welcome-leave");
    welcomechannel.send(`Good riddance! ${member} has bailed on the server!`);

  });



  bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let prefix = botconfig.prefix;
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  if(cmd === `${prefix}userinfo`) {
    return;
  }


//kick
  if(cmd === `${prefix}kick`) {
    return;
  }

  //tempmute
  if(cmd === `${prefix}tempmute`) {
    return;
  }


//ban
  if(cmd === `${prefix}ban`) {
    return;
  }


//report
  if(cmd === `${prefix}report`) {
    return;
  }


//serverinfo
  if(cmd === `${prefix}serverinfo`) {
    return;
  }

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }

//botinfo
  if(cmd === `${prefix}botinfo`) {
    return;
  }

});




bot.login(botconfig.token);
