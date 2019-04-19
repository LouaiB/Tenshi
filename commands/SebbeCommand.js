module.exports = {
    execute: function execute(arg, channel){
        let index = randomInt(1,5);

        switch(index){
            case 1: channel.send("kes 2ommak ya " + arg); break;
            case 2: channel.send(arg + " wa7ad mafla3 loote"); break;
            case 3: channel.send("ommak ya " + arg); break;
            case 4: channel.send("tawbiz wle " + arg); break;
            case 5: channel.send("bteswa 2ayre ya " + arg); break;
        }
    }
}

function randomInt(min,max)
{
    try{
        return Math.floor(Math.random()*(max-min+1)+min);
    } catch(e){}

    return 0;
}