'use strict';
const sql = require('mssql');
const cust = require('./sql_cust');
const format = require('../base_scripts/object_format');
const log4js = require('log4js');
const logger = log4js.getLogger('CANCEL');

// After Shipment Void function
exports.afterVoid = async function (shipment) {
  try {
    // Builds SQL query to update an existing record with a 'Y' into the voided column
    let sqlQuery = `UPDATE [${cust.config.options.database}].[DBO].[${cust.shipment.tableName}] SET ${cust.shipment.void} = 'Y' WHERE ${cust.shipment.id} = '${shipment.id}'`;
    // Open SQL connection
    let pool = await sql.connect(cust.config);
    // Executes query
    await pool.query(sqlQuery);
    // Close SQL connection
    pool.close();
    // Logs to log file
    logger.info(`Shipment ${shipment.id} canceled`);
    logger.debug(sqlQuery);
  } catch (err) {
    // Logs any errors that might occur to the log file
    logger.error(err);
  }
};
