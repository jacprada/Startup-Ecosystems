var fs                  = require('fs');
var request             = require('request-promise');
var cheerio             = require('cheerio');
var mongoose            = require("mongoose");
var colors              = require('colors');
var CommunityMember     = require("../models/communityMember");

var results     = { countries: [] }
var country     = { name: "", url: "" }
var counter     = 0;

var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/startup-ecosystems'
mongoose.connect(databaseURL);

url = "http://london.startups-list.com/people"

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
    var url = countryElement.url + "/people";

    if (!countryElement.url) {
      increaseCounter();

    } else {
      request(url)
        .then(function(body, response){
          var $ = cheerio.load(body);
           
          $("#wrap .startup").each(function(i, el){
            console.log("Crawling " + $(el).data("name") + "".yellow);

            // Using closure to protect the value of el, member and newCommunityMember
            (function($, el){
              var member = {
                name: $(el).data("name"),
                url: $(el).attr("href"),
                bio: $(el).find("strong").last().text().trim(),
                twitter: $(el).toString().match(/<!\-\-\s*.*href="(.*?)"/)[1],
                image: $(el).find("img").attr("data-src"),
                location: countryElement.name
              }

              if (member.name && member.url && member.bio && member.twitter && member.twitter !== "null" && member.image) {
                console.log("Correct details and accessing MongoDB".yellow);

                CommunityMember.findOne({ "url": member.url }, function(err, communityMember) {
                  if (err) console.log(err);
                  if (communityMember) {
                    member._id = communityMember._id;
                    
                    CommunityMember.findByIdAndUpdate(communityMember._id, member, {new: true}, function(err, updatedCommunityMember){
                      if (err) console.log(newCommunityMember.name + " not updated.".red);
                      console.log(updatedCommunityMember.name + " was updated.".blue)
                    })
                  }

                  var newCommunityMember        = new CommunityMember();
                  newCommunityMember.name       = member.name;
                  newCommunityMember.url        = member.url;
                  newCommunityMember.bio        = member.bio;
                  newCommunityMember.twitter    = member.twitter;
                  newCommunityMember.image      = member.image;
                  newCommunityMember.location   = member.location;

                  newCommunityMember.save(function(err) {
                    if (err) console.log(newCommunityMember.name + " NOT saved.".red);
                    console.log(newCommunityMember.name + " is saved.".green);
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
    fs.writeFile('../datasets/communityBackup.json', JSON.stringify(results, null, 4), function(err){
      console.log('BOOM.');
    })
  }
}