'use strict';
const fs = require('fs');
const csvjson = require('csvjson');
const cust = require('./csv_cust');
const format = require('../base_scripts/object_format');
const log4js = require('log4js');
const logger = log4js.getLogger('PACKAGE');

// Package ID Lookup
exports.packageLookup = async function (searchString) {
  // Reads CSV file
  var data = fs.readFileSync(cust.csvPackageFile, 'utf8');
  // Converts read file into an object
  csvJSON = csvjson.toObject(data);
  // Defines final array returned to SMART
  let results = [];
  // Searches file and identifies the matching ID entered
  for (let i = 0; i < csvJSON.length; i++) {
    if (csvJSON[i][cust.package.packageId] == searchString) {
      results.push(format.formatPackageObject(csvJSON[i], cust.package));
    }
  }
  // Logs to log file
  logger.debug(JSON.stringify(results));
  // Returns results to SMART
  return results;
};
