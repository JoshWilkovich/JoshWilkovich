'use strict';
const MongoClient = require('mongodb').MongoClient;
const cust = require('./mongo_cust');
const format = require('../base_scripts/object_format');
const log4js = require('log4js');
const logger = log4js.getLogger('RECORD');

// After Shipment Process Function
exports.publishShipment = async function (shipment, batch) {
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
        if (batch) {
          let insertMany = [];
          for (let i = 0; i < shipment.length; i++) {
            insertMany.push(format.formatAfterShip(shipment[i], cust.shipment));
          }
          db.collection(cust.shipment.collectionName).insertMany(
            insertMany,
            function (err, res) {
              if (err) {
                logger.error(err);
              }
              logger.debug(JSON.stringify(insertMany));
              logger.info(shipment.length + ' document(s) inserted');
              database.close();
            }
          );
        } else {
          let insert = format.formatAfterShip(shipment, cust.shipment);
          db.collection(cust.shipment.collectionName).insertOne(
            insert,
            function (err, res) {
              if (err) {
                logger.error(err);
              }
              logger.debug(JSON.stringify(insert));
              logger.info('1 document inserted');
              database.close();
            }
          );
        }
      }
    }
  );
};
