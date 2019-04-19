const request = require("request");
const weatherGirls = require("../json/weatherGirls");

module.exports = {
    execute: function execute(arg, message){

        try{
            request(`http://api.openweathermap.org/data/2.5/find?q=${arg}&appid=ffc3012c0d439cd179e4cf1c25117ed9&units=metric`, 
                function(err, res, body) {

                    if(!err && res.statusCode == 200) { // Successful response

                        const weatherJSON = JSON.parse(body);

                        if(weatherJSON.count == 0){ // Entered place is invalid
                            message.channel.send("Invalid place");
                            return;
                        }

                        // Image to be added in the report
                        const girl = weatherGirls[ weatherJSON.list[0].weather[0].main ];

                        // Embed Creation
                        message.channel.send({embed: {
                            "title": "Current weathor for " + weatherJSON.list[0].name + ", " + weatherJSON.list[0].sys.country,
                            "color": 2091007,
                            "footer": {
                                "text": "Please do not exceed 60 requests/min"
                            },
                            "image": {
                                "url": girl
                            },
                            "author": {
                                "name": "OpenWeatherMap",
                                "url": "https://openweathermap.org/",
                                "icon_url": `http://openweathermap.org/img/w/${weatherJSON.list[0].weather[0].icon}.png`
                            },
                            "fields": [
                                {
                                "name": "Weather",
                                "thumbnail": "",
                                "value": weatherJSON.list[0].weather[0].main + " | " + weatherJSON.list[0].weather[0].description
                                },
                                {
                                "name": "Current Temperature",
                                "value": weatherJSON.list[0].main.temp + " ° C"
                                },
                                {
                                "name": "Lowest Temperature",
                                "value": weatherJSON.list[0].main.temp_min + " ° C",
                                "inline": true
                                },
                                {
                                "name": "Highest Temperature",
                                "value": weatherJSON.list[0].main.temp_max + " ° C",
                                "inline": true
                                },
                                {
                                "name": "Wind",
                                "value": weatherJSON.list[0].wind.speed + " km/h | " + weatherJSON.list[0].wind.speed + " °"
                                },
                                {
                                "name":"Humidity",
                                "value":weatherJSON.list[0].main.humidity + "%" 
                                }
                            ]
                            }
                        });

                    } else { // Error with the API request
                        console.log(err);
                        message.channel.send("Something went wrong");
                    }
            });
        }
        catch(e){
            message.channel.send("Something isn't right");
        }
    }   

}