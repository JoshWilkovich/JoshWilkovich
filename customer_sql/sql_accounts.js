'use strict';
const sql = require('mssql');
const cust = require('./sql_cust');
const format = require('../base_scripts/object_format');
const log4js = require('log4js');
const logger = log4js.getLogger('ACCOUNTS');

// Account Search Function
exports.accountSearch = async function (searchString, level) {
  try {
    // Builds SQL query
    let sqlQuery = `SELECT * FROM [${cust.config.options.database}].[DBO].[${
      cust.account.tableName
    }] WHERE (${cust.account.code} LIKE '%${searchString}%' OR ${
      cust.account.name
    } LIKE '%${searchString}%') AND ${cust.account.level} = '${level + 1}'`;
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
        format.formatAccountObject(sqlResults.recordset[i], cust.account)
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
