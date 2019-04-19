const recommendList = require("../json/recommend.json");

module.exports = {
    execute : function execute(arg, channel){
        switch(arg){
            case "action":  channel.send(recommendList.action); break;
            case "romance":  channel.send(recommendList.romance); break;
            case "comedy":  channel.send(recommendList.comedy); break;
            case "moe":  channel.send(recommendList.moe); break;
            case "scifi":  channel.send(recommendList.scifi); break;
        }
    }
}