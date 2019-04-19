module.exports = {

    getRandomItem: function getRandomItem(json){
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
}

function randomInt(min,max)
{
    try{
        return Math.floor(Math.random()*(max-min+1)+min);
    } catch(e){}

    return 0;
}