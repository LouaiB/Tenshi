const request = require("request");
const unirest = require('unirest');

module.exports = {
    execute: function execute(arg, message){

        let token;
        let code;

        const code_request_url = 'https://anilist.co/api/v2/oauth/authorize?client_id=1805&redirect_uri=https://discordapp.com/developers/applications/560114295153754115/bots&response_type=code';

        request(code_request_url, function(error, response, body){
            if (!error && response.statusCode == 200) {
                console.log("Code: " + JSON.stringify(response.headers));
                code = body.code;
              } else {
                  console.log("error with code request");
              }
        });

        

        const options = {
            uri: 'https://anilist.co/api/v2/oauth/token',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            json: {
              'grant_type': 'authorization_code',
              'client_id': '1805',
              'client_secret': 'Ng9GxgJb1843P4xjAFSk8nm05pjqqHiLAM5Tq9Ex',
              'redirect_uri': 'https://discordapp.com/developers/applications/560114295153754115/bots', // http://example.com/callback
              'code': code, // The Authorization Code received previously
            }
          };
          
          request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log(body.access_token);
              token = body.access_token;
            } else {
                console.log("error with token request");
            }
          });
        
       unirest.post("https://Anilistmikilior1V1.p.rapidapi.com/searchSeries")
        .header("X-RapidAPI-Key", "3050407057mshd5be3e1149d3ba6p147617jsn7ef49fbd7b15")
        .header("Content-Type", "application/x-www-form-urlencoded")
        .send("seriesType=anime")
        .send("query=angel beats")
        .send(`accessToken=${token}`)
        .end(function (result) {
            console.log(result.status, result.headers, result.body);

            message.channel.send("```json\n" + JSON.stringify(result.status) + "\n\n" + JSON.stringify(result.headers) + "\n\n" + JSON.stringify(result.body) + "```");
        });
    }
}