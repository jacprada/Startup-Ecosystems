var mongoose = require('mongoose');

var HubSchema = new mongoose.Schema({
  name: String,
  area: String,
  lat: Number,
  lng: Number,
  ranking: Number,
  performance: Number,
  funding: Number,
  market_reach: Number,
  talent: Number,
  startup_experience: Number,
  growth_index: Number,
  ecosystem value: Number,
  female_founders: Number,
  founder_age: Number,
  founder_with_hypergrowth_startup_experience: Number,
  startups_with_tech_founder: Number,
  startup_density: Number,
  average_seed_round: Number,
  average_a_round: Number,
  time_to_hire_engineers: Number,
  software_engineer_salary: Number,
  remote_employees: Number,
  female_employees: Number,
  foreign_employees: Number,
  foreign_customers: Number,
  top_target_markets: Array,
  employees_with_startup_experience: Number,
  equity_to_employees: Number,
  national_government_rated_positive: Number,
  top_policy_issues: Array
});

var Hub = mongoose.model('Hub', HubSchema);
module.exports = Hub;