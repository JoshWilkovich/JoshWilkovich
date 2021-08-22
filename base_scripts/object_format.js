'use strict';
const transCarrier = require('../base_scripts/trans_carrier');
// Set the customer info to the actual customer file you are using
const cust = require('../customer_sql/sql_cust');

// FORMATS THE OBJECTS MOVING IN AND OUT OF SMART

// Formats the Account Object
exports.formatAccountObject = function (data, layout) {
  let results = {
    code: data[layout.code],
    name: data[layout.name],
    dim: data[layout.level],
  };
  return results;
};

// Formats the Address Object
exports.formatAddressObject = function (data, layout) {
  let results = {
    code: data[layout.code],
    name1: data[layout.name1],
    name2: data[layout.name2],
    address1: data[layout.address1],
    address2: data[layout.address2],
    address3: data[layout.address3],
    postcode: data[layout.postcode],
    city: data[layout.city],
    state: data[layout.state],
    country: data[layout.country],
    isResidential: data[layout.isResidential],
    email: data[layout.email],
    phone1: data[layout.phone1],
    data: { saveAddress: data[layout.saveAddress] },
  };
  return results;
};

// Function to format returned data into object for SMART
exports.formatPackageObject = function (data, layout) {
  let results = {
    transaction_type: { type: layout.transactionType },
    package_id: data[layout.packageId], // Does not work in 1.6.0 b200
    carrier: data[layout.carrier],
    service: data[layout.service],
    serviceName: data[layout.serviceName],
    shipping_date: data[layout.shippingDate], // Does not work in 1.6.0 b200
    from: {
      name: data[layout.shipFrom.name], // Does not work in 1.6.0 b200
      company_name: data[layout.shipFrom.companyName], // Does not work in 1.6.0 b200
      address1: data[layout.shipFrom.address1], // Does not work in 1.6.0 b200
      address2: data[layout.shipFrom.address2], // Does not work in 1.6.0 b200
      address3: data[layout.shipFrom.address3], // Does not work in 1.6.0 b200
      city: data[layout.shipFrom.city], // Does not work in 1.6.0 b200
      state_province: data[layout.shipFrom.stateProvince], // Does not work in 1.6.0 b200
      postal_code: data[layout.shipFrom.postalCode], // Does not work in 1.6.0 b200
      country: data[layout.shipFrom.country], // Does not work in 1.6.0 b200
      phone1: data[layout.shipFrom.phone1], // Does not work in 1.6.0 b200
    },
    to: {
      code: data[layout.shipTo.code],
      name: data[layout.shipTo.name],
      company_name: data[layout.shipTo.companyName],
      address1: data[layout.shipTo.address1],
      address2: data[layout.shipTo.address2],
      address3: data[layout.shipTo.address3],
      city: data[layout.shipTo.city],
      state_province: data[layout.shipTo.stateProvince],
      postal_code: data[layout.shipTo.postalCode],
      country: data[layout.shipTo.country],
      is_residential: data[layout.shipTo.isResidential],
      is_us_territory: data[layout.shipTo.isUSTerritory],
      phone1: data[layout.shipTo.phone1],
      email: data[layout.shipTo.email],
      data: { saveAddress: data[layout.saveAddress] }, // Does not work in 1.6.0 b200
    },
    piece_count: data[layout.numOfPackages], // Does not work in 1.6.0 b200
    parcels: [
      {
        number: 0,
        dim: {
          length: data[layout.parcels.dim.length],
          width: data[layout.parcels.dim.width],
          height: data[layout.parcels.dim.height],
          girth: data[layout.parcels.dim.girth],
          units: layout.parcels.dim.units,
        },
        weight: {
          value: data[layout.parcels.weight.value],
          units: layout.parcels.weight.units,
        },
        packaging: data[layout.parcels.packaging], // Does not work in 1.6.0 b200
        packaging_name: data[layout.parcels.packagingName], // Does not work in 1.6.0 b200
      },
    ],
    // Billing Details currently not supported in 1.6.0 b200
    billing_details: {
      billing_type: data[layout.billingDetails.billingType], // Does not work in 1.6.0 b200
      account_number: data[layout.billingDetails.accountNumber], // Does not work in 1.6.0 b200
      postal_code: data[layout.billingDetails.postalCode], // Does not work in 1.6.0 b200
      country_code: data[layout.billingDetails.countryCode], // Does not work in 1.6.0 b200
    },
    costcenter: [
      data[layout.costcenter.level1],
      data[layout.costcenter.level2],
      data[layout.costcenter.level3],
      data[layout.costcenter.level4],
      data[layout.costcenter.level5],
    ],
    // Account Name is REQUIRED in 1.6.0 b200 due to UI requirements
    costcenter_name: [
      data[layout.costcenter_name.level1],
      data[layout.costcenter_name.level2],
      data[layout.costcenter_name.level3],
      data[layout.costcenter_name.level4],
      data[layout.costcenter_name.level5],
    ],
    references: [
      data[layout.references.reference1],
      data[layout.references.reference2],
      data[layout.references.reference3],
      data[layout.references.reference4],
      data[layout.references.reference5],
    ],
    // Meta Data holds non specific items
    // Examples: Notification settings, Packaging Type settings, etc
    meta_data: {
      //   selectedPackaging:
      //     '{"name":"Test box","dim":{"length":12,"width":9,"height":1},"weight":{"value":0.3125,"units":"LB"},"description":"Test box"}',
    },
  };
  // If custom forms are available, add them
  if (
    data[layout.shipTo.country] !== 'US' &&
    data[layout.customsForm] === 'Y'
  ) {
    let customs = addCustomForm(data, layout);
    results = { ...results, customs };
  }
  // If notifications are present, add them
  if (data[layout.notifications.sendNotifications] === 'Y') {
    let emailConfig = buildNotificationString(data, layout);
    results.meta_data = { ...results.meta_data, emailConfig };
  }
  // Clean up unused fields
  for (let i = 0; i < results.references.length; i++) {
    if (
      results.references[i] == null ||
      results.references[i] == undefined ||
      results.references[i] == 'undefined'
    ) {
      results.references[i] = '';
    }
  }
  for (let i = 0; i < results.costcenter.length; i++) {
    if (
      results.costcenter[i] == null ||
      results.costcenter[i] == undefined ||
      results.costcenter[i] == 'undefined'
    ) {
      results.costcenter[i] = '';
    }
  }
  if (cust.enableCarrierTransPackageID) transCarrier.translateCarrier(results);
  return results;
};

// Builds the Customs Form object if it is available
function addCustomForm(data, layout) {
  let results = {
    contents_type: data[layout.customs.contents_type],
    non_delivery_option: data[layout.customs.non_delivery_option],
    contents_description: data[layout.customs.contents_description],
    comments: data[layout.customs.comments],
    customs_refnum_sender: data[layout.customs.customs_refnum_sender],
    invoice_number: data[layout.customs.invoice_number],
    certificate_number: data[layout.customs.certificate_number],
    license_number: data[layout.customs.license_number],
    contents_items: [
      {
        parcel_num: 0,
        description: data[layout.customs.contents_items.description],
        origin_country: 'US',
        hs_tariff: data[layout.customs.contents_items.hs_tariff],
        quantity: data[layout.customs.contents_items.quantity],
        // Does not work in 1.6.0 b200
        weight: {
          value: data[layout.customs.contents_items.weight.value],
          units: 'LB',
        },
        value: {
          value: +data[layout.customs.contents_items.value.value],
          currency: 'USD',
        },
      },
    ],
    customs_refnum_importer: data[layout.customs.customs_refnum_importer],
    eelpfc: data[layout.customs.eelpfc],
  };
  return results;
}

// Builds the Notification String if they are available
function buildNotificationString(data, layout) {
  let results = `{"shipper":{"email":"${
    data[layout.notifications.shipperEmail]
  }","creation":true,"allEvents":true,"delivery":true,"settings":${
    data[layout.notifications.shipperSettings]
  }},"recipient":{"email":"${
    data[layout.notifications.recipientEmail]
  }","creation":true,"allEvents":true,"delivery":true,"settings":${
    data[layout.notifications.recipientSettings]
  }},"thirdParty":{"email":"${
    data[layout.notifications.thirdPartyEmail]
  }","creation":true,"allEvents":true,"delivery":true,"settings":${
    data[layout.notifications.thirdPartySettings]
  }},"creation":1,"allEvents":2,"delivery":4,"notifications":[{"notify":"${
    data[layout.notifications.shipperEmail]
  }","type":["CREATION","DELIVERY","ALL"],"who":"shipper"},{"notify":"${
    data[layout.notifications.recipientEmail]
  }","type":["CREATION","DELIVERY","ALL"],"who":"recipient"},{"notify":"${
    data[layout.notifications.thirdPartyEmail]
  }","type":["CREATION","DELIVERY","ALL"],"who":"thirdparty"}]}`;
  return results;
}

// Formats the After Shipment Object
exports.formatAfterShip = function (data, layout) {
  // Creates and adds system date for created
  if (!data.created_date) {
    data.created_date = new Date().toJSON();
  }
  // Adds MISC to the category for MISC transactions
  if (!data.transaction_type.category) {
    data.transaction_type.category = 'MISC';
  }
  if (data.carrier && cust.enableCarrierTransAfterShip)
    transCarrier.translateCarrier(data);
  let results = {
    [layout.transactionType.type]: data.transaction_type.type,
    [layout.costcenter.level1]: data.costcenter[0],
    [layout.costcenter.level2]: data.costcenter[1],
    [layout.costcenter.level3]: data.costcenter[2],
    [layout.costcenter.level4]: data.costcenter[3],
    [layout.costcenter.level5]: data.costcenter[4],
    [layout.charges.baseCharge]: +data.charges.base_charge.toFixed(3),
    [layout.charges.totalCharge]: data.charges.total_charge,
    [layout.pieceCount]: data.piece_count,
    [layout.shippedDate]: data.shipping_date,
    [layout.createdDate]: data.created_date,
  };
  // Adds SHIPPING Transaction specific fields
  if (data.transaction_type.type === 'SHIPPING') {
    results = {
      ...results,
      [layout.id]: data.id,
      [layout.packageId]: data.package_id, // Does not work in 1.6.0 b200
      [layout.isRts]: data.is_rts,
      [layout.by.id]: data.by.id,
      [layout.by.accountNumber]: data.by.account_number,
      [layout.shipFrom.name]: data.from.name,
      [layout.shipFrom.companyName]: data.from.company_name,
      [layout.shipFrom.address1]: data.from.address1,
      [layout.shipFrom.address2]: data.from.address2,
      [layout.shipFrom.address3]: data.from.address3,
      [layout.shipFrom.city]: data.from.city,
      [layout.shipFrom.postalCode]: data.from.postal_code,
      [layout.shipFrom.stateProvince]: data.from.state_province,
      [layout.shipFrom.country]: data.from.country,
      [layout.shipFrom.phone1]: data.from.phone1,
      [layout.shipTo.code]: data.to.code,
      [layout.shipTo.name]: data.to.name,
      [layout.shipTo.companyName]: data.to.company_name,
      [layout.shipTo.address1]: data.to.address1,
      [layout.shipTo.address2]: data.to.address2,
      [layout.shipTo.address3]: data.to.address3,
      [layout.shipTo.city]: data.to.city,
      [layout.shipTo.postalCode]: data.to.postal_code,
      [layout.shipTo.stateProvince]: data.to.state_province,
      [layout.shipTo.country]: data.to.country,
      [layout.shipTo.isResidential]: data.to.is_residential,
      [layout.shipTo.email]: data.to.email,
      [layout.shipTo.phone1]: data.to.phone1,
      [layout.masterTrackingNum]: data.primary_tracking,
      [layout.trackingNumber]: data.primary_tracking,
      [layout.totalWeight.value]: data.total_weight.value,
      [layout.billing.billingType]: data.billing_details.billing_type,
      [layout.billing.accountNumber]: data.billing_details.account_number,
      [layout.billing.postalCode]: data.billing_details.postal_code,
      [layout.billing.countryCode]: data.billing_details.country_code,
      [layout.references.reference1]: data.references[0],
      [layout.references.reference2]: data.references[1],
      [layout.references.reference3]: data.references[2],
      [layout.references.reference4]: data.references[3],
      [layout.references.reference5]: data.references[4],
      [layout.handlingCharge]: data.handlingcharge,
      [layout.charges.extraServiceFees]: data.charges.total_fees,
    };
  }
  // Adds MAILING Transaction specific fields
  if (data.transaction_type.type === 'MAILING') {
    results = {
      ...results,
      [layout.id]: data.batch_id,
      [layout.packageId]: data.mailing.mail_piece_id,
      [layout.transactionType.category]: data.transaction_type.mode,
      [layout.parcels.weight.value]: data.parcels[0].weight.value,
      [layout.references.reference1]: data.references[0],
      [layout.handlingCharge]: data.handlingcharge, // Does not work in 1.6.0 b200
      [layout.mailing.isPresort]: data.mailing.is_presort,
      [layout.mailing.ascRegisterStart]: data.mailing.asc_register_start,
      [layout.mailing.ascRegisterEnd]: data.mailing.asc_register_end,
      [layout.mailing.descRegisterStart]: data.mailing.desc_register_start,
      [layout.mailing.descRegisterEnd]: data.mailing.desc_register_end,
      [layout.mailing.meterNumber]: data.mailing.fm_num,
      [layout.mailing.offline]: data.mailing.is_offline,
      [layout.mailing.mailPieceID]: data.mailing.mail_piece_id,
      [layout.charges.extraServiceFees]: data.charges.total_fees,
    };
  }
  // Adds MANUAL Transaction specific fields
  if (data.transaction_type.type === 'MANUAL') {
    results = {
      ...results,
      [layout.transactionType.category]: data.transaction_type.category,
      [layout.handlingCharge]: data.handlingcharge,
      [layout.description]: data.description,
    };
  }
  // If dimensions exist, add them
  if (!data.transaction_type.type === 'MANUAL' && data.parcels[0].dim) {
    results = {
      ...results,
      [layout.parcels.dim.length]: data.parcels[0].dim.length,
      [layout.parcels.dim.width]: data.parcels[0].dim.width,
      [layout.parcels.dim.height]: data.parcels[0].dim.height,
      [layout.parcels.dim.girth]: data.parcels[0].dim.girth,
    };
  }
  // Handles Tracking Numbers from MPS
  if (!data.transaction_type.type === 'MANUAL' && data.parcels[0].tracking) {
    let multiple = '';
    for (let i = 0; i < data.parcels.length; i++) {
      multiple = multiple + `${data.parcels[i].tracking}, `;
    }
    results = {
      ...results,
      [layout.trackingNumber]: multiple.substring(0, multiple.length - 2),
    };
  }
  // Adds Retail and Contract rates if available
  if (data.other_charges) {
    let retail;
    let contract;
    for (let i = 0; i < data.other_charges.length; i++) {
      if (data.other_charges[i].charge_type === 'RETAIL') {
        retail = data.other_charges[i].total_charge;
      } else {
        contract = data.other_charges[i].total_charge;
      }
    }
    results = {
      ...results,
      [layout.retailCharge]: retail,
      [layout.contractCharge]: contract,
    };
  }
  // Adds Carrier information
  if (data.carrier) {
    results = {
      ...results,
      [layout.carrier]: data.carrier,
      [layout.service]: data.service,
      [layout.serviceName]: data.service_name,
    };
  }
  // If a country exists, add it
  if (data.to) {
    results = { ...results, [layout.shipTo.country]: data.to.country };
  }
  // Adds extra services exist, add them (up to 4)
  if (data.charges.fees) {
    let esValues = [];
    for (let i = 0; i < data.charges.fees.length; i++) {
      esValues.push(data.charges.fees[i].value);
    }
    results = {
      ...results,
      [layout.extraCharges.extraCharge1]: esValues[0],
      [layout.extraCharges.extraCharge2]: esValues[1],
      [layout.extraCharges.extraCharge3]: esValues[2],
      [layout.extraCharges.extraCharge4]: esValues[3],
    };
  }
  return results;
};

exports.formatAfterCancel = function (data, layout) {
  let results = {
    [layout.id]: data.id,
    [layout.level1]: data.costcenter[0],
    [layout.level2]: data.costcenter[1],
    [layout.level3]: data.costcenter[2],
    [layout.level4]: data.costcenter[3],
    [layout.level5]: data.costcenter[4],
    [layout.carrier]: data.carrier,
    [layout.service]: data.service,
    [layout.serviceName]: data.service_name,
    [layout.pieceCount]: data.piece_count,
    [layout.totalCharge]: data.charges.total_charge,
    [layout.masterTrackingNum]: data.primary_tracking,
    [layout.createdDate]: data.created_timestamp,
  };
  return results;
};
