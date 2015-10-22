var fs          = require('fs');
var request     = require('request-promise');
var cheerio     = require('cheerio');
var mongoose    = require("mongoose");
var colors      = require('colors');
var Startup     = require("../models/startup");
var async = require('async');
// psuedo code
// go to each website and find each a tag and each see if it has an email address, it does then save it to an array of emails
// url = a.attr('href')
// use url from body of the request for finding the object in the database.
var c;
var results     = [];
var companies;
var Allstartups     = { name: "", url: "" };
var counter     = 0;
var totalLinks  = 0;
var hasEmail = false;
var indexCounter = 0;
var hasEmailCounter = 0;
var allCompanies = {};
var emailValidator       = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/startup-ecosystems'
mongoose.connect(databaseURL);

var checkCount = function () {
  if (hasEmail) {
    hasEmailCounter++;
    indexCounter++;
    hasEmail = false;
  }
};
var callbackAfterAll = function(){

  console.log("For emails of links -  Emails:" + counter + " vs Links:" + totalLinks);
  console.log('For companies having emails on page: ', hasEmailCounter, ' of ', allCompanies.length)
    fs.writeFile('../datasets/startupEmails.json', JSON.stringify({ results }, null, 4), function(err){
     if (err) console.log('could not writeFile');
      console.log('BOOM.');
    });
};


var selectScrape = function(body) {

  console.log("Starting crawl".bold.rainbow.inverse);
  // var name =  Math.random().toString(36).substring(7);

  var $ = cheerio.load(body);
  totalLinks +=  Object.keys($('a')).length;

  // use closure to protect value of companies[indexCounter]
(function($, companies, indexCounter) {
  async.each(Object.keys($('a')), function(key, callbackAfterEach) {
  
  if ($('a')[key].attribs) {
    if ($('a')[key].attribs.href) {

      var url = $('a')[key].attribs.href;
    
    if (/mailto:/.test(url) > -1) {
      url = url.replace(/mailto:/, '');
      url = url.replace(/\?.*/,'');
   
       if (emailValidator.test(url)) {
        var i;
        for(i; i < results.length;i++) {
          if (results[i]['name'] == companies[indexCounter].name) {
            results[i]['emails'].push(url);
            break;
          } 
        }
        if (i == results.length) {
           results.push({ 'name': companies[indexCounter].name , 'emails': [url] });
        }
        
          console.log(url, ' is an email address'.bgYellow);
          hasEmail = hasEmail || true;
          Startup.findOne({ _id: companies[indexCounter]._id }, function (err, startup){
           startup.emails.push(url);
            startup.save(function (err){
            if (err) console.log(err);
            counter++;
            console.log(url, ' email saved successfully'.green);
             callbackAfterEach();
            });
          });
        }
       else {
          // console.log('could not save ', url);
          callbackAfterEach();
        }
    } else {
      // console.log('not mailto', url, ' ', counter++);
      callbackAfterEach();
    }
   }
}
 }); 
})($, companies, indexCounter);
};

function init () {

 Startup.find({ location: 'London', url: { $exists: true } }).then(function (pulledCompanies) {
  companies = pulledCompanies;
  console.log(pulledCompanies);
runScrape();
});

}
init();
// RUN SCRAPE below
function runScrape () {
    async.each(companies, function(co, callbackAfterEach) {
         
         
          if (/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(co.url)) {
          request(co.url).setMaxListeners(0).then(selectScrape, checkCount, callbackAfterEach, function () {
            callbackAfterEach();
          });

          } 
          else {
            callbackAfterEach();
          } 
    },callbackAfterAll);
}
