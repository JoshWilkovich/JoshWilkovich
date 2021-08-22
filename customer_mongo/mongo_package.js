'use strict';
const MongoClient = require('mongodb').MongoClient;
const cust = require('./mongo_cust');
const format = require('../base_scripts/object_format');
const log4js = require('log4js');
const logger = log4js.getLogger('PACKAGE');

// Package ID Lookup
exports.packageLookup = async function (searchString) {
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
    let query = { [cust.package.packageId]: searchString };
    let queryResults = await collection.find(query).toArray();
    let results = [];
    for (let i = 0; i < queryResults.length; i++) {
      results.push(format.formatPackageObject(queryResults[i], cust.package));
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
