'use strict';
const fs = require('fs');
const csvjson = require('csvjson');
const cust = require('./csv_cust');
const format = require('../base_scripts/object_format');
const log4js = require('log4js');
const logger = log4js.getLogger('ADDRESS');

// Address Lookup Function
exports.addressSearch = async function (searchString, field) {
  // Reads CSV file
  var data = fs.readFileSync(cust.csvAddressFile, 'utf8');
  // Converts read file into an object
  csvJSON = csvjson.toObject(data);
  // Defines final array returned to SMART
  let results = [];
  // Searchs file data to match data to entered field
  for (let i = 0; i < csvJSON.length; i++) {
    if (
      // Address ID field
      csvJSON[i][cust.address.code].indexOf(searchString) > -1 &&
      field == 'code'
    ) {
      results.push(format.formatAddressObject(csvJSON[i], cust.address));
    } else if (
      // Company Name field
      csvJSON[i][cust.address.name1].indexOf(searchString) > -1 &&
      field == 'company'
    ) {
      results.push(format.formatAddressObject(csvJSON[i], cust.address));
    } else if (
      // Attention field
      csvJSON[i][cust.address.name2].indexOf(searchString) > -1 &&
      field == 'attention'
    ) {
      results.push(format.formatAddressObject(csvJSON[i], cust.address));
    }
  }
  // Logs to log file
  logger.debug(JSON.stringify(results));
  // Returns results to SMART
  return results;
};
