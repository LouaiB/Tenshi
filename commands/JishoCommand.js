const request = require("request");
const jishoApi = require('unofficial-jisho-api');
const jisho = new jishoApi();


module.exports = {
    execute: function execute(arg, message){

        

            request(`http://beta.jisho.org/api/v1/search/words?keyword=` + encodeURIComponent(arg), 
                function(err, res, body) {

                    try{

                        //console.log("err: " + err);
                        //console.log("res: " + JSON.stringify(res));
                        //console.log("body: " + body);

                        if(!err && res.statusCode == 200) { // Successful response
                            const words = JSON.parse( body );

                            const writting = words.data[0].japanese[0].word; if(writting == "") writting = "None";
                            const kana = words.data[0].japanese[0].reading; if(kana == "") kana = "None";
                            const jlpt = words.data[0].jlpt.join(" || "); if(jlpt == "") jlpt = "None";

                            let meanings = "";
                            for(elem in words.data[0].senses){
                                const sense = words.data[0].senses[elem];
                                console.log(sense);

                                const partsOfSpeech = sense.parts_of_speech.join(" || ");
                                const englishDefinitions = sense.english_definitions.join("; ");

                                meanings += "```\n";
                                if(partsOfSpeech != "") meanings += "PoS: " + partsOfSpeech + "\n-------------------------------\n";
                                meanings += englishDefinitions + "```\n";
                            }
                            if(meanings == "") meanings = "None";

                            let example = "";
                            jisho.searchForExamples(arg).then(result => {
                                
                                console.log(result);
                                for(i = 0; i < 3; i++){
                                    if(typeof result.results[i] != "undefined"){
                                        example += "```\n";

                                        const ex = result.results[i];

                                        example += ex.kanji + "\n\n";
                                        example += ex.kana + "\n\n";
                                        example += ex.english;

                                        example += "```\n";
                                    }
                                }

                                if(example == "") example = "None";
                            
                            

                                // Embed Creation
                                message.channel.send({
                                    "embed": {
                                    "url": "https://jisho.org",
                                    "color": 8847137,
                                    "thumbnail": {
                                        "url": "https://cheatshacks.org/wp-content/uploads/2017/07/63019_featured.png"
                                    },
                                    "author": {
                                        "name": "Jisho",
                                        "url": "https://jisho.org",
                                        "icon_url": "https://assets.jisho.org/assets/touch-icon-017b99ca4bfd11363a97f66cc4c00b1667613a05e38d08d858aa5e2a35dce055.png"
                                    },
                                    "fields": [
                                        {
                                        "name": "Writting",
                                        "value": writting
                                        },
                                        {
                                        "name": "Reading",
                                        "value": kana,
                                        "inline": true
                                        },
                                        {
                                        "name": "JLPT Level",
                                        "value": jlpt,
                                        "inline": true
                                        },
                                        {
                                        "name": "Meanings",
                                        "value": meanings
                                        },
                                        {
                                        "name": "Examples",
                                        "value": example
                                        }
                                    ]
                                    }
                                });
                            });
                        }
                        else{ // Failed request
                            message.channel.send("Something went wrong");
                        }

                    }catch(e){
                        message.channel.send("No results found");
                    }
                });

        
    }
    
}
