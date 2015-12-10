var jsonfile    = require('jsonfile');
var request     = require('request-promise');
var cheerio     = require('cheerio');
var mongoose    = require("mongoose");
var colors      = require('colors');
var Startup     = require("../models/startup");

var results     = { countries: [] }
var country     = { name: "", url: "" }
var counter     = 0;

var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/startup-ecosystems'
mongoose.connect(databaseURL);

url = "http://london.startups-list.com/?sort=alpha"

var selectScrape = function(body, response){
  console.log("Starting crawl".bold.rainbow.inverse)

  var $ = cheerio.load(body);
  $("#cityDrop option").each(function(i, element){
    // console.log("Crawling url for " + $(element).text());
    country.name = $(element).text();
    country.url = $(element).val();
    results.countries.push(country);
    country = { name: "", url: "" }
  });

  results.countries.forEach(function(countryElement, countryIndex) {
    // console.log("url: ", countryElement.url);
    var url = countryElement.url + "/?sort=alpha";

    if (!countryElement.url) {
      increaseCounter();

    } else {
      request(url)
        .then(function(body, response){
          var $ = cheerio.load(body);
           
          $("#wrap .startup").each(function(i, el){
            console.log("Crawling " + $(el).data("name") + "".magenta);

            // Using closure to protect the value of el, company and newStartup
            (function($, el){
              var company = {
                externalId: $(el).data("id"),
                name: $(el).data("name"),
                url: $(el).data("href"),
                bio: $(el).find(".main_link img").attr("alt"),
                twitter: $(el).find(".main_link span").attr("href"),
                image: $(el).find(".main_link img").attr("data-src"),
                location: countryElement.name
              };

              if (company.bio && company.image && company.twitter !== "" && company.twitter !== "null" && company.url !== "") {
                console.log("Correct details and accessing MongoDB".magenta);

                Startup.findOne({ "url": company.url }, function(err, startup) {
                  if (err) console.log(err);
                  if (startup) {
                    company._id = startup._id;
                    
                    Startup.findByIdAndUpdate(startup._id, company, {new: true}, function(err, updatedStartup){
                      if (err) console.log(newStartup.name + " not updated.".red);
                      console.log(updatedStartup.name + " was updated.".blue)
                    });
                  }

                  var newStartup        = new Startup();
                  newStartup.externalId = company.externalId;
                  newStartup.name       = company.name;
                  newStartup.url        = company.url;
                  newStartup.bio        = company.bio;
                  newStartup.twitter    = company.twitter;
                  newStartup.image      = company.image;
                  newStartup.location   = company.location;

                  newStartup.save(function(err) {
                    if (err) console.log(newStartup.name + " NOT saved.".red);
                    console.log(newStartup.name + " is saved.".green);
                  });
                });
              }
            })($, el);

          })

          increaseCounter();
        })
        .catch(function(){
          increaseCounter();
        })
    }
  });
}

request(url)
  .then(selectScrape)
  .catch(console.error)

var increaseCounter = function(){
  counter++;
  console.log("Counter:" + counter + " vs results:" + results.countries.length);
  
  if (counter == results.countries.length) {
    jsonfile.writeFile('../datasets/startupsBackup.json', results, function(err){
      console.log('BOOM.');
    });
  }
}