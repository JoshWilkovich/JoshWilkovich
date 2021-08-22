'use strict';
const MongoClient = require('mongodb').MongoClient;
const cust = require('./mongo_cust');
const format = require('../base_scripts/object_format');
const log4js = require('log4js');
const logger = log4js.getLogger('ADDRESS');

// Address Lookup Function
exports.addressSearch = async function (searchString, field) {
  const client = await MongoClient.connect(cust.config.url, {
    useUnifiedTopology: true,
  }).catch(err => {
    logger.error(err);
  });
  if (!client) {
    return [];
  }
  try {
    // Uses 'field' to determine what to query
    let query = { [cust.address.code]: searchString };
    if (field === 'company') query = { [cust.addressname1]: searchString };
    if (field === 'attention') query = { [cust.address.name2]: searchString };
    const db = client.db(cust.config.dbName);
    let collection = db.collection(cust.address.collectionName);
    let queryResults = await collection.find(query).toArray();
    let results = [];
    for (let i = 0; i < queryResults.length; i++) {
      results.push(format.formatAddressObject(queryResults[i], cust.address));
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
