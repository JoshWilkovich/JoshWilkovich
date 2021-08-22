'use strict';
const fetch = require('node-fetch');
const cust = require('./api_cust');
const log4js = require('log4js');
const logger = log4js.getLogger('RECORD');

// After Shipment Process Function
exports.publishShipment = async function (shipment, batch) {
  try {
    // Builds API url with values from SMART
    let url = `${cust.apiURL}shipment`;
    // Sends full shipment object via POST to API
    fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(shipment),
      method: 'POST',
    }).then(shipment => shipment.json());
    // Logs to log file
    logger.debug(JSON.stringify(shipment));
  } catch (err) {
    // Logs any errors that might occur to the log file
    logger.error(err);
  }
};
