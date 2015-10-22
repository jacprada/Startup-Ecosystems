var jsonfile = require('jsonfile');

var file = './datasets/startupEmails.json'

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
var results     = {};
var companies;
var Allstartups     = { name: "", url: "" };
var counter     = 0;
var totalLinks  = 0;
var tallyCounter = 0;
var hasEmail = false;
var indexCounter = -1;
var hasEmailCounter = 0;
var allCompanies = {};
var emailValidator       = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/startup-ecosystems'
mongoose.connect(databaseURL);

var checkCount = function () {
  if (hasEmail) {
    hasEmailCounter++;
 
    hasEmail = false;
  }

  if (tallyCounter >= 1498) {
            callbackAfterAll();
          } 
};
var callbackAfterAll = function(){
  console.log(results);
  console.log("For emails of links -  Emails:" + counter + " vs Links:" + totalLinks);
  console.log('For companies having emails on page: ', hasEmailCounter, ' of ', companies.length)
  jsonfile.writeFile(file, results, function (err) {
  if (err) console.error(err)
  console.log('written');
  });
};


var selectScrape = function(body) {

  console.log("Starting crawl".bold.rainbow.inverse);
  // var name =  Math.random().toString(36).substring(7);
  tallyCounter++;
  var $ = cheerio.load(body);
  totalLinks +=  Object.keys($('a')).length;

  // use closure to protect value of companies[indexCounter]
  Object.keys($('a')).forEach(function (key) { 
(function($, companies, indexCounter) {

    var value = $('a')[key];
    if ($('a')[key].attribs) {
      if ($('a')[key].attribs.href) {

        var url = $('a')[key].attribs.href;
      tallyCounter++;
      if (/mailto:/.test(url) > -1) {
        url = url.replace(/mailto:/, '');
        url = url.replace(/\?.*/,'');
     
         if (emailValidator.test(url)) {
          var i;
          if (results[companies[indexCounter].name])
               results[companies[indexCounter].name].push(url);
          else {
              results[companies[indexCounter].name] = [];
              results[companies[indexCounter].name].push(url);
          }
          console.log(url, ' is an email address'.bgYellow);
          counter++;
          }
         
       } 
      } 
    }
  })($, companies, indexCounter);
});

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
          indexCounter++;
          if (/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(co.url)) {
          request(co.url).setMaxListeners(0).then(selectScrape, checkCount, callbackAfterEach, function () {
            callbackAfterEach();
          });

          } 
          else {
            callbackAfterEach();
          } 
    });
}
