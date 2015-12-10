var jsonfile = require('jsonfile');

var file = './datasets/startupEmails.json';

var request     = require('request-promise');
var cheerio     = require('cheerio');
var mongoose    = require("mongoose");
var colors      = require('colors');
var Startup     = require("../models/startup");
var async = require('async');
var responses = [];
var completed_requests = 0;
var results     = {};
var companies = [];
var urls = [];
var counter      = 0;
var totalLinks   = 0;
var tallyCounter = -1;
var hasEmail = false;
var hasEmailCounter = 0;
var allCompanies = {};
var emailValidator       = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/startup-ecosystems'
mongoose.connect(databaseURL);

var selectScrape = function(body) {


};

function init () {

 Startup.find({ location: 'London', url: { $exists: true } }).then(function (pulledCompanies) {

  var l=0; for(l;l < pulledCompanies.length; l++) {
    if (/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(pulledCompanies[l].url)) { 
        companies.push(pulledCompanies[l]);
   }
  }
   
runScrape();
});

}
init();
// RUN SCRAPE below
function runScrape () {

      console.log(companies.length);
   async.each(companies, function(co, callbackAfter) {

          request(co.url).setMaxListeners(0).then(function (body) {  
            urls.push(co.url);
          
            results[co.url] = body;

            completed_requests++;
        if (completed_requests == companies.length) {
          GetEmails();
        }
        callbackAfter();
        return;
      }).catch(function(){

            results[co.url] = '';
            completed_requests++;
            console.log(completed_requests);
            if (completed_requests == companies.length) {
               GetEmails();
               return;
            }
            callbackAfter();
            return;
        });
    // }
    // })(co);
  }, GetEmails);
}

function toJson () {
  console.log("For emails of links -  Emails:" + counter + " vs Links:" + totalLinks);

  console.log('For companies having emails on page: ', hasEmailCounter, ' of ', companies.length)

jsonfile.writeFile(file, results, function (err) {
  if (err) console.error(err);
  console.log('done and written');
  });
}

function GetEmails () {
async.each(Object.keys(results), function(resp, callbackAfter) {
      // var i=0; for(i; i < responses.length;i++) {
        
        // var name =  Math.random().toString(36).substring(7);
        // console.log('co********************************', );
        tallyCounter++;
        if (results[resp] !== '') {
        var $ = cheerio.load(results[resp]);
        totalLinks +=  Object.keys($('a')).length;

        // use closure to protect value of companies[indexCounter]
       // (function () { 
       //  })(companies, tallyCounter, $('a'))
        async.each(Object.keys($('a')), function (key, callback) { 

       // (function($, companies, i) {
          var value = $('a')[key];
          if ($('a')[key].attribs) {
            if ($('a')[key].attribs.href) {

            var url = $('a')[key].attribs.href;
           
            if (/mailto:/.test(url) > -1) {
              url = url.replace(/mailto:/, '');
              url = url.replace(/\?.*/,'');
            console.log(resp, 'startup url inside async');
               if (emailValidator.test(url)) {
                  if (Object.prototype.toString.call(results[resp]) === '[object Array]') {
                    results[resp].push(url);
                    Startup.find({ url: resp }, function (err, startup) {
                      if (err) console.log('could not get startup', url);
                      if (!startup) console.log('no startup found and url', resp);
                      if (!startup.emails) startup.emails = [];
                      startup.emails.push(url);
                      startup.save(function (err) {
                        if (err) console.log('could not save');
                        console.log('added email', url);
                      });
                    });
            
                    callback();
                  } else {
                    results[resp] = [];
                    results[resp].push(url);
                    console.log('added email', results[resp]);
                    callback();
                    return;
                  }
                  
               }
             }
           } else {
            callback();
            return;
           }
         }
       },callbackAfter);

     } else {
           callbackAfter();
           return;
     }
     if (tallyCounter == results.length) {
      toJson();
      return;
     }
   }, toJson);
}


  
     //              Startup.find({ url: urls[tallyCounter] }, function (err, startup){
     //                  if (err) return;
     //                  startup.emails.push(url);
     //                  startup.save(function (err) {
     //                    if (err) return;
     //                    console.log(startup.name, url);
     //                    console.log(url, ' is an email address'.bgYellow);
     //                   counter++;
     //                  });
     //              });                  
        
                
                
     //         } 
     //        } 
     //      }
     //      // })($, companies, i);
     //    });
     //  }
     //      if (hasEmail) {
     //        hasEmailCounter++;
         
     //        hasEmail = false;
     //      }

     //      if (tallyCounter >= 1442) {
     //        // callbackAfterAll();
     //      } 
     //    if (tallyCounter == responses.length) {
     //      // callbackAfterAll();
     //    }
     //    }); 
// }
        

