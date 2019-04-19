const helpJson = require("../json/help");
const helpDetailedJson = require("../json/helpDetailed");

module.exports = {
    execute: function execute(arg, message){

        let helpJsonParsed = JSON.parse(JSON.stringify(helpJson));
        
        if(arg == ""){
            let helpList = "```\n|help <command> to view detailed explanation on each command\n\n";

            for(cmd in helpJsonParsed){
                helpList += cmd + " : " + helpJson[cmd] + "\n";
            }

            helpList += "```";
            message.channel.send(helpList);
            return;
        }

        if(typeof helpDetailedJson[arg] === "undefined"){
            message.channel.send("Unrecognized command");
            return;
        }

        message.channel.send("```" + helpDetailedJson[arg] + "```");
    }
}