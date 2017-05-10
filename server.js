var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var axios = require('axios');
var fs = require('fs');
var app = express();



var apiurl = "https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=bb22994edea54d5f8a63aca872b34452";
var url = "";
var newsUrl = "";
var id = 0;


app.get('', function(req, res){


    axios.get(apiurl).then(function(response){

      url = response.data.articles[0].url;
    })


    request(url, function(err, response, html){

        if(!err){
          var $ = cheerio.load(html);
          var json = {url:"", title:"", content:""};
          json.url = url;

          $('.story-body__h1').filter(function(){
            var data = $(this);
            var title = data.text();

            json.title = title;
          })

          $('.story-body__inner').filter(function(){
            var data = $(this);
            var content = data.text();

            var deletedStr = [0];
            var deleteStart = 0;
            var deleteEnd = 0;
            var id = 0;


            // delete /***/ to /***/
            // still not done yet

            for (var i = 0; i < content.length; i++) {
              if(content[i] === '/'){deletedStr[id++] = i};
            }

            deleteStart = deletedStr[0];
            deleteEnd = deletedStr[3];

            console.log(deleteStart);



            json.content = content;
          })



          fs.writeFile(`output.json`, JSON.stringify(json, null, 4), function(err){
              console.log('File successfully written! - Check your project directory for the output.json file');
          })

        }
      })

  res.send('articles from bbc');

})

const port = 3030;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}...`);
});
