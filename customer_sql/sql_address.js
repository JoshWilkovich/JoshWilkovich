'use strict';
const sql = require('mssql');
const cust = require('./sql_cust');
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
    // Builds SQL Query
    let sqlQuery = `SELECT * FROM [${cust.config.options.database}].[DBO].[${cust.address.tableName}] WHERE ${sqlColumn} LIKE '%${searchString}%'`;
    // Open SQL connection
    let pool = await sql.connect(cust.config);
    // Executes query
    let sqlResults = await pool.query(sqlQuery);
    // Close SQL connection
    pool.close();
    // Defines final array returned to SMART
    let results = [];
    // Sends returned query results to be formatted and placed into results array
    for (let i = 0; i < sqlResults.rowsAffected; i++) {
      results.push(
        format.formatAddressObject(sqlResults.recordset[i], cust.address)
      );
    }
    // Logs to log file
    logger.debug(sqlQuery);
    logger.debug(JSON.stringify(results));
    // Returns results to SMART
    return results;
  } catch (err) {
    // Logs any errors that might occur to the log file
    logger.error(err);
  }
};
