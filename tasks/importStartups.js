var mongoose    = require("mongoose");
var util = require('util');
var jsonfile = require('jsonfile');
var async = require('async');
var Startup     = require("../models/startup");
var databaseURL = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/startup-ecosystems';
mongoose.connect(databaseURL);

// var results     = { countries: [] };
// var country     = { name: "", url: "" };
var counter     = 0;
var companyCounter = 0;
var colors      = require('colors');
var company;
var data;

// Insert JSON file here
var file = './datasets/startups.json';
jsonfile.readFile(file, function(err, obj) {
	if (err) console.log(err);
 
obj.countries.forEach(function(countryElement, countryIndex) {
		console.log('in country', counter++);
				// asynchronously import the startups to mongodb
				async.each(Object.keys(countryElement.companies), function(key, callbackAfterEach) {
				  
								console.log('in company', companyCounter++);
						  	company	 = countryElement.companies[key];
				              // if (company.bio && company.image && company.twitter !== "" && company.twitter !== "null" && company.url !== "") { // if you want to filter
				                console.log("Importing ".magenta, company.name);
				                  var newStartup        = new Startup();
				                  newStartup.externalId = company.externalId;
				                  newStartup.name       = company.name;
				                  newStartup.url        = company.href;
				                  newStartup.bio        = company.bio;
				                  newStartup.twitter    = company.twitter;
				                  newStartup.image      = company.image;
				                  newStartup.location   = countryElement.name.replace(' ', '');
				                 
				                  newStartup.save(function(err) {
				                    if (err) console.log(err, newStartup.name + " NOT saved.".red);
				                    console.log(newStartup.name + " is saved.".green);
				                      callbackAfterEach();
				                  });
				                // } else {  callbackAfterEach(); }
				}, callbackAfterAll);
	        	
      	});

});
var callbackAfterAll = function () {
	console.log('total companies imported: ', companyCounter );
console.log('in ', counter, ' countries');
};
