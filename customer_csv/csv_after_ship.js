'use strict';
const fs = require('fs');
const cust = require('./csv_cust');
const format = require('../base_scripts/object_format');
const log4js = require('log4js');
const logger = log4js.getLogger('RECORD');

// After Shipment Process Function
exports.publishShipment = function (shipment, batch) {
  if (batch) {
    for (let i = 0; i < shipment.length; i++) {
      exports.publishShipment(shipment[i], false);
    }
    return;
  }
  // Format the object into
  let csvShipment = cust.csvFormat(
    format.formatAfterShip(shipment, cust.shipment),
    cust.shipment
  );
  logger.debug(JSON.stringify(csvShipment));
  // Format and add header if new file
  if (fs.existsSync(cust.csvShipmentFile)) {
    fs.appendFile(
      cust.csvShipmentFile,
      '\n' + Object.values(csvShipment),
      err => {
        if (err) {
          logger.error(err);
        } else {
          logger.info(`Wrote shipment to file`);
        }
      }
    );
  } else {
    fs.appendFile(cust.csvShipmentFile, Object.keys(csvShipment), err => {
      if (err) {
        logger.error(err);
      }
    });
    fs.appendFile(
      cust.csvShipmentFile,
      '\n' + Object.values(csvShipment),
      err => {
        if (err) {
          logger.error(err);
        } else {
          logger.info(`Wrote shipment to file`);
        }
      }
    );
  }
};

function alterDelimiters(data) {
  let string = '';
  let textQualifier = `"`;
  let delimiter = `:`;
  let array = Object.values(data);
  for (i = 0; i < array.length; i++) {
    string = string + `${textQualifier}${array[i]}${textQualifier}${delimiter}`;
  }
  return string;
}
