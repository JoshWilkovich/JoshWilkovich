'use strict';
const fs = require('fs');
const csvjson = require('csvjson');
const cust = require('./csv_cust');
const format = require('../base_scripts/object_format');
const log4js = require('log4js');
const logger = log4js.getLogger('ACCOUNTS');

// Account Lookup Function
exports.accountSearch = async function (searchString, level) {
  // Reads CSV file
  var data = fs.readFileSync(cust.csvAccountFile, 'utf8');
  // Converts read file into an object
  csvJSON = csvjson.toObject(data);
  // Defines final array returned to SMART
  let results = [];
  // Searchs file data to match entered number and level
  for (let i = 0; i < csvJSON.length; i++) {
    if (
      csvJSON[i][cust.account.code].indexOf(searchString) > -1 &&
      csvJSON[i][cust.account.level] == level + 1
    ) {
      results.push(format.formatAccountObject(csvJSON[i], cust.account));
    }
  }
  // Logs to log file
  logger.debug(JSON.stringify(results));
  // Returns results to SMART
  return results;
};
