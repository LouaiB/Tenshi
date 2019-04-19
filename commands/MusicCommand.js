const musicFiles = require("../json/music.json");

module.exports = {
    execute: function execute(arg, message){
        const args = arg.split(" ");
        const songname = args.slice(1).join(" ").toLowerCase();

        /************************* JOIN VC COMMAND ****************************/
        if(arg === "join"){
            if(message.member.voiceChannel && !message.guild.voiceConnection){
                message.member.voiceChannel.join()
                    .then(connection => {
                        message.reply("ready to play piano!");
                    });
            } 
            else {
                message.reply("please wait for me in the voice channel!");
            }
            
            return;
        }

        /************************* LEAVE VC COMMAND ****************************/        
        if(arg === "leave"){
            if(message.guild.voiceConnection){
                message.guild.voiceConnection.disconnect();
            }
            else {
                message.reply("I'm not in a voice channel");
            }

            return;
        }

        /************************* PLAY TRACK COMMAND ****************************/  
        if(args[0] === "play"){
            if(!message.guild.voiceConnection){
                message.reply("I'm not in a voice channel yet, take me there");
            }
            else {
                message.guild.voiceConnection.player.setBitrate(92);

                if(typeof args[1] === "undefined"){ // no song specified, select one at random
                    const chosen = getRandomValue(musicFiles);
                    message.guild.voiceConnection.playFile("./music/" + chosen);
                } 
                else if(typeof musicFiles[songname] === "undefined"){ // song specified doesn't exist
                    message.reply("I don't know that song: " + songname);
                }
                else { // a specific song
                    message.guild.voiceConnection.playFile("./music/" + musicFiles[songname]);
                }
            }

            return;
        }

        /************************* LIST AVAILABLE TRACKS COMMAND ****************************/  
        if(arg === "list"){
            let availableTracks = JSON.parse(JSON.stringify(musicFiles));
            let list = "";

            for(track in availableTracks){
                list += track + "\n";
            }

            message.channel.send("```" + list + "```");

            return;
        }

        /************************* STOP PLAYING COMMAND ****************************/  
        if(arg === "stop"){
            try{
                message.guild.voiceConnection.playFile("./music/none.mp3"); 
            } catch(e){
                message.channel.send("I think you're confused");
            }

            return;
        }

    }
}

function getRandomValue(json){
    let jsonParsed = JSON.parse(JSON.stringify(json));
    let chosen = "", i = 1, count = 0;

    // Get number of items in json
    for(item in jsonParsed){
        count++;
    }

    // Get random number from 1 -> number of items
    let index = randomInt(1, count);

    for(item in jsonParsed){
        if(i === index){
            chosen = jsonParsed[item];
            break;
        }
        i++;
    }

    return chosen;
}

function randomInt(min,max)
{
    try{
        return Math.floor(Math.random()*(max-min+1)+min);
    } catch(e){}

    return 0;
}