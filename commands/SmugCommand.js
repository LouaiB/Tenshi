const smugArt = require("../json/smugArt.json");

module.exports = {
    execute: function execute(channel)
    {     
        try{
            let availableArt = JSON.parse(JSON.stringify(smugArt));
            let chosen = "", i = 1, artCount = 0;

            // Get number of art images in json
            for(pic in availableArt){
                artCount++;
            }

            // Get random number from 1 -> number of arts
            let index = randomInt(1, artCount);

            for(pic in availableArt){
                if(i === index){
                    chosen = smugArt[pic];
                    break;
                }
                i++;
            }

            channel.send(chosen);
        } catch(e){
            channel.send("something went wrong");
        }
        return;
    }
}

function randomInt(min,max)
{
    try{
        return Math.floor(Math.random()*(max-min+1)+min);
    } catch(e){}

    return 0;
}