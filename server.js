var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var axios = require('axios');
var fs = require('fs');
var app = express();

var yts = require('youtube-scrape');



var apiurl = "https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=bb22994edea54d5f8a63aca872b34452";
var url = "";
var newsUrl = "";
var id = 0;


app.get('', function(req, res){

  yts('nba playoffs').then((data) => {
  // data is an array with the first page of results
  console.log(data)

  var json = {data:""};

  json.data = data;

  fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
    console.log('File successfully written! - Check your project directory for the output.json file');
  })
  res.send('check your console');

}, (error) => {
  // An error occurred
  console.log(error)
})


})

const port = 3030;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}...`);
});
