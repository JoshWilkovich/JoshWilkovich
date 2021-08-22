'use strict';
const sql = require('mssql');
const cust = require('./sql_cust');
const format = require('../base_scripts/object_format');
const log4js = require('log4js');
const logger = log4js.getLogger('RECORD');

// After Shipment Process Function
exports.publishShipment = async function (shipment, batch) {
  try {
    let columns = '';
    let values = '';
    // Builds the columns and values for the SQL query
    if (batch) {
      // Checks if Mailing Transaction - ALL mailing transactions have batch set to true
      for (let i = 0; i < shipment.length; i++) {
        columns = buildColumns(
          format.formatAfterShip(shipment[0], cust.shipment)
        );
        values =
          values +
          '(' +
          collectValues(format.formatAfterShip(shipment[i], cust.shipment)) +
          '),';
      }
      // Removes extra comma
      values = values.substring(0, values.length - 1);
    } else {
      // Handles all other types of transactions - Shipping and Manual
      columns = buildColumns(format.formatAfterShip(shipment, cust.shipment));
      values = `(${collectValues(
        format.formatAfterShip(shipment, cust.shipment)
      )})`;
    }
    // Builds SQL Query
    let sqlQuery = `INSERT INTO [${cust.config.options.database}].[DBO].[${cust.shipment.tableName}] (${columns}) VALUES ${values}`;
    // Open SQL connection
    let pool = await sql.connect(cust.config);
    // Executes query
    await pool.query(sqlQuery);
    // Close SQL connection
    pool.close();
    // Logs to log file
    logger.info(`Transaction(s) added`);
    logger.debug(JSON.stringify(sqlQuery));
  } catch (err) {
    // Logs any errors that might occur to the log file
    logger.error(err);
  }
};

// Builds the column list for the INSERT INTO query
function buildColumns(data) {
  let col = Object.keys(data);
  let columns = '';
  for (let i = 0; i < col.length; i++) {
    columns = columns + col[i] + ', ';
  }
  return columns.substring(0, columns.length - 2);
}

// Builds the values list for the INSERT QUERY
function collectValues(data) {
  let val = Object.values(data);
  let values = '';
  for (let i = 0; i < val.length; i++) {
    values = values + "'" + val[i] + "'" + ', ';
  }
  return values.substring(0, values.length - 2);
}
