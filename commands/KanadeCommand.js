const kanadeArt = require("../json/kanadeArt.json");
const randJsonItem = require("../imports/randJsonItem");

module.exports = {
    execute: function execute(arg, channel)
    {     
        // Random
        if(arg === ""){
            try{
                let chosen = randJsonItem.getRandomItem(kanadeArt);
                channel.send(chosen);
            } catch(e){
                channel.send("something went wrong");
            }
            return;
        }
        
        // List the available art
        if(arg === "list"){
            let availableArt = JSON.parse(JSON.stringify(kanadeArt));
            let list = "";

            for(art in availableArt){ list += art + "\n"; }
            channel.send("```" + list + "```");

            return;
        }

        // Not Found
        if(typeof kanadeArt[arg] === 'undefined') {
            channel.send("I haven't had that art made yet");
            return;
        }

        // Specific
        channel.send(kanadeArt[arg]);
    }


}