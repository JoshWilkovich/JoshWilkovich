'use strict';
const fs = require('fs');
const cust = require('./csv_cust');
const format = require('../base_scripts/object_format');
const log4js = require('log4js');
const logger = log4js.getLogger('CANCEL');

// After Cancel Function
exports.afterVoid = function (shipment) {
  // Format the object into
  let csvShipment = format.formatAfterCancel(shipment, cust.cancel);
  logger.debug(JSON.stringify(csvShipment));
  // Format and add header if new file
  if (fs.existsSync(cust.csvCancelFile)) {
    fs.appendFile(
      cust.csvCancelFile,
      '\n' + Object.values(csvShipment),
      err => {
        if (err) {
          logger.error(err);
        } else {
          logger.info(`Wrote cancel to file`);
        }
      }
    );
  } else {
    fs.appendFile(cust.csvCancelFile, Object.keys(csvShipment), err => {
      if (err) {
        logger.error(err);
      }
    });
    fs.appendFile(
      cust.csvCancelFile,
      '\n' + Object.values(csvShipment),
      err => {
        if (err) {
          logger.error(err);
        } else {
          logger.info(`Wrote cancel to file`);
        }
      }
    );
  }
};
