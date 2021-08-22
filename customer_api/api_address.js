'use strict';
const fetch = require('node-fetch');
const cust = require('./api_cust');
const format = require('../base_scripts/object_format');
const log4js = require('log4js');
const logger = log4js.getLogger('ADDRESS');

// Address Lookup Function
exports.addressSearch = async function (searchString, field) {
  try {
    // Uses 'field' to determine what column to query
    let sqlColumn = cust.address.code;
    if (field === 'company') sqlColumn = cust.address.name1;
    if (field === 'attention') sqlColumn = cust.address.name2;
    // Builds API url with values from SMART
    let url = `${cust.apiURL}addresses/?val=${searchString}&fld=${sqlColumn}`;
    // Sends request to API
    let response = await fetch(url);
    // Stores returned data from API
    let apiResults = await response.json();
    // Defines final array returned to SMART
    let results = [];
    // Sends returned results to be formatted and placed into results array
    for (let i = 0; i < apiResults.length; i++) {
      results.push(format.formatAddressObject(apiResults[i], cust.address));
    }
    // Logs to log file
    logger.debug(JSON.stringify(results));
    return results;
  } catch (err) {
    // Logs any errors that might occur to the log file
    logger.error(err);
  }
};
