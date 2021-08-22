'use strict';
const MongoClient = require('mongodb').MongoClient;
const cust = require('./mongo_cust');
const format = require('../base_scripts/object_format');
const log4js = require('log4js');
const logger = log4js.getLogger('ACCOUNTS');

// Account Search Function
exports.accountSearch = async function (searchString, level) {
  const client = await MongoClient.connect(cust.config.url, {
    useUnifiedTopology: true,
  }).catch(err => {
    logger.error(err);
  });
  if (!client) {
    return [];
  }
  try {
    const db = client.db(cust.config.dbName);
    let collection = db.collection(cust.account.collectionName);
    var query = { level: level + 1 };
    let queryResults = await collection.find(query).toArray();
    let results = [];
    for (let i = 0; i < queryResults.length; i++) {
      if (
        queryResults[i].code.includes(searchString) ||
        queryResults[i].name.includes(searchString)
      ) {
        results.push(format.formatAccountObject(queryResults[i], cust.account));
      }
    }
    for (let i = 0; i < results.length; i++) {
      results[i].dim = level + 1;
    }
    logger.debug(query);
    logger.debug(JSON.stringify(results));
    return results;
  } catch (err) {
    logger.error(err);
  } finally {
    client.close();
  }
};
