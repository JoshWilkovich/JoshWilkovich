'use strict';
const MongoClient = require('mongodb').MongoClient;
const cust = require('./mongo_cust');
const format = require('../base_scripts/object_format');
const log4js = require('log4js');
const logger = log4js.getLogger('CANCEL');

// After Shipment Void function
exports.afterVoid = async function (shipment) {
  MongoClient.connect(
    cust.config.url,
    {
      useUnifiedTopology: true,
    },
    function (err, database) {
      if (err) {
        logger.error('Unable to connect to mongo server ERROR :', err);
      } else {
        const db = database.db(cust.config.dbName);
        let cancel = format.formatAfterCancel(shipment, cust.cancel);
        db.collection(cust.cancel.collectionName).insertOne(
          cancel,
          function (err, res) {
            if (err) {
              logger.error(err);
            }
            logger.debug(JSON.stringify(cancel));
            logger.info('1 document inserted');
            database.close();
          }
        );
      }
    }
  );
};
