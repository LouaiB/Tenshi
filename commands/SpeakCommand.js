

module.exports = {
    execute: function execute(message, arg, channel){
        if(message.author.id != 487667553662140417){
            message.reply("Reserved for master only!");
            return;
        }

        switch(arg.toLowerCase()){
            case "i love you": channel.send("I love you too, " + message.author.username + "!"); break;
            case "what's your favorite food?": channel.send("Mapo tofu"); break;
            case "pat me": message.reply(" https://i.imgur.com/hCs14E4.png"); break;
            case "marry me": message.reply(" https://static.zerochan.net/Tachibana.Kanade.full.624689.jpg"); break;
            case "aaan": message.reply(" http://kaitencompagnie.com/ressources/avatar/BK201.jpg"); break;
            case "hug me": message.reply(" https://img.neoseeker.com/mgv/419757/757/72/kanaday.jpg"); break;
        }
    }
}