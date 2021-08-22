'use strict';
var path = require('path');

// Scripts/functions in use
const accountScript = require('./csv_accounts');
const addressScript = require('./csv_address');
const packageScript = require('./csv_package');
const afterShipScript = require('./csv_after_ship');
const afterCancelScript = require('./csv_after_cancel');

// Script Details that show in RTI Connector
// Customer Name
exports.customer = 'CSV Company';

// Author:  Josh Wilkovich
exports.creator = 'Quadient Professional Services';

// Version of the integration
exports.version = '1.0.0';

// CUSTOMER OPTIONS
exports.enableCarrierTransPackageID = false;
exports.enableCarrierTransAfterShip = false;
exports.enableMailingConsolidation = false;

// File Paths
exports.csvAccountFile = path.join(__dirname, '../csv/accounts.csv');
exports.csvAddressFile = path.join(__dirname, '../csv/addresses.csv');
exports.csvPackageFile = path.join(__dirname, '../csv/packages.csv');
exports.csvShipmentFile = path.join(__dirname, '../csv/shipments.csv');
exports.csvCancelFile = path.join(__dirname, '../csv/canceled.csv');

// Column headers in .CSV file
// Account File
exports.account = {
  code: 'Acct_Num', // REQUIRED
  name: 'Acct_Name', // REQUIRED
  level: 'Acct_Lvl', // REQUIRED
  parent: 'Account_Parent',
  budget: 'Account_Budget',
};

// Address File
exports.address = {
  code: 'ID', // Lookup Column - REQUIRED
  name1: 'Company', // Lookup Column - REQUIRED
  name2: 'Attention', // Lookup Column - REQUIRED
  address1: 'Address1', // REQUIRED
  address2: 'Address2',
  address3: 'Address3',
  postcode: 'ZIP', // REQUIRED
  city: 'City', // REQUIRED
  state: 'State', // REQUIRED
  country: 'Country', // MUST BE ISO CODE - REQUIRED
  isResidential: 'Residential',
  email: 'Email',
  phone1: 'Phone', // REQUIRED
  saveAddress: 'Save',
};

// Packade File
exports.package = {
  packageId: 'id', // Lookup Field - REQUIRED
  transactionType: 'SHIPPING',
  isRts: 'isRTS',
  // Shipping Details
  carrier: 'carrier',
  service: 'service',
  serviceName: 'service_name',
  shippingDate: 'shipping_date',
  // Ship From details
  shipFrom: {
    name: 'from_name',
    companyName: 'from_company_name',
    address1: 'from_address1',
    address2: 'from_address2',
    address3: 'from_address3',
    city: 'from_city',
    stateProvince: 'from_state_province',
    postalCode: 'from_postal_code',
    country: 'from_country',
    phone1: 'from_phone',
  },
  // Ship To details
  shipTo: {
    code: 'to_code',
    name: 'to_name',
    companyName: 'to_company_name',
    address1: 'to_address1',
    address2: 'to_address2',
    address3: 'to_address3',
    city: 'to_city',
    stateProvince: 'to_state_province',
    postalCode: 'to_postal_code',
    country: 'to_country',
    isResidential: 'to_is_residential',
    isUSTerritory: 'to_is_us_territory',
    email: 'to_Email',
    phone1: 'to_phone',
  },
  // Package Details
  numOfPackages: 'parcels_number',
  parcels: {
    number: '0',
    dim: {
      length: 'parcels_dim_length',
      width: 'parcels_dim_width',
      height: 'parcels_dim_height',
      girth: 'parcels_dim_girth',
      units: 'IN',
    },
    weight: {
      value: 'parcels_weight_value',
      units: 'LB',
    },
    packaging: 'parcels_packaging',
    packagingName: 'parcels_packaging_name',
  },
  // Billing Details
  billingDetails: {
    billingType: 'billing_details_billing_type',
    accountNumber: 'billing_details_account_number',
    postalCode: 'billing_details_postal_code',
    countryCode: 'billing_details_country_code',
  },
  // Account Numbers
  costcenter: {
    level1: 'costcenter1',
    level2: 'costcenter2',
    level3: 'costcenter3',
    level4: 'costcenter4',
    level5: 'costcenter5',
  },
  // Account Names
  costcenter_name: {
    level1: 'costcenterName1',
    level2: 'costcenterName2',
    level3: 'costcenterName3',
    level4: 'costcenterName4',
    level5: 'costcenterName5',
  },
  // Reference Fields
  references: {
    reference1: 'reference1',
    reference2: 'reference2',
    reference3: 'reference3',
    reference4: 'reference4',
    reference5: 'reference5',
  },
  // Customs Information
  customsForm: '',
  customs: {
    contents_type: '',
    non_delivery_option: '',
    contents_description: '',
    comments: '',
    customs_refnum_sender: '',
    invoice_number: '',
    certificate_number: '',
    license_number: '',
    contents_items: {
      parcel_num: 0,
      description: '',
      origin_country: 'US',
      hs_tariff: '',
      quantity: '',
      weight: {
        value: '',
        units: 'LB',
      },
      value: {
        value: '',
        currency: 'USD',
      },
    },
    customs_refnum_importer: '',
    eelpfc: '',
  },
  // Notification Settings
  notifications: {
    sendNotifications: '',
    shipperEmail: '',
    shipperSettings: '',
    recipientEmail: '',
    recipientSettings: '',
    thirdPartyEmail: '',
    thirdPartySettings: '',
  },
};

// Shipment File
exports.shipment = {
  tableName: 'Shipment',
  id: 'Item_ID',
  packageId: 'Package_ID',
  // Shipping Details
  carrier: 'Carrier',
  service: 'Service',
  serviceName: 'Service_Name',
  transactionType: {
    type: 'Transaction_Type',
    category: 'Transaction_Category',
  },
  isRts: 'Is_RTS',
  // Carrier Account used
  by: {
    id: 'Ship_By_ID',
    accountNumber: 'Ship_By_Account',
  },
  // Ship From details
  shipFrom: {
    name: 'Ship_From_Attention',
    companyName: 'Ship_From_Company',
    address1: 'Ship_From_Add1',
    address2: 'Ship_From_Add2',
    address3: 'Ship_From_Add3',
    city: 'Ship_From_City',
    postalCode: 'Ship_From_ZIP',
    stateProvince: 'Ship_From_State',
    country: 'Ship_From_Country',
    phone1: 'Ship_From_Phone',
  },
  // Ship To details
  shipTo: {
    code: 'Ship_To_Code',
    name: 'Ship_To_Attention',
    companyName: 'Ship_To_Company',
    address1: 'Ship_To_Add1',
    address2: 'Ship_To_Add2',
    address3: 'Ship_To_Add3',
    city: 'Ship_To_City',
    stateProvince: 'Ship_To_State',
    postalCode: 'Ship_To_ZIP',
    country: 'Ship_To_Country',
    isResidential: 'Ship_To_ResFlag',
    email: 'Ship_To_Email',
    phone1: 'Ship_To_Phone',
  },
  // Package Details
  pieceCount: 'Pieces',
  trackingNumber: 'Tracking_Number',
  masterTrackingNum: 'Master_Tracking_Num',
  parcels: {
    number: '0',
    dim: {
      length: 'Parcel_Length',
      width: 'Parcel_Width',
      height: 'Parcel_Height',
      girth: 'Parcel_Girth',
      units: 'IN',
    },
    weight: {
      value: 'Parcel_Weight',
      units: 'LB',
    },
  },
  totalWeight: {
    value: 'Parcel_Weight',
    units: 'LB',
  },

  // Billing Details
  billing: {
    billingType: 'Billing_Type',
    accountNumber: 'Billing_Acct_Num',
    postalCode: 'Billing_Acct_ZIP',
    countryCode: 'Billing_Acct_Country',
  },
  // Dates
  createdDate: 'Created_Date',
  shippedDate: 'Shipped_Date',
  adjustedDate: 'Adjusted_Date',
  canceledDate: 'Canceled_Date',
  // Account Numbers
  costcenter: {
    level1: 'Account_Number_1',
    level2: 'Account_Number_2',
    level3: 'Account_Number_3',
    level4: 'Account_Number_4',
    level5: 'Account_Number_5',
  },
  // References
  references: {
    reference1: 'Reference_Field_1',
    reference2: 'Reference_Field_2',
    reference3: 'Reference_Field_3',
    reference4: 'Reference_Field_4',
    reference5: 'Reference_Field_5',
  },
  // Charges
  charges: {
    baseCharge: 'Base_Charge',
    extraServiceFees: 'Extra_Service_Charge',
    totalCharge: 'Total_Charge',
  },
  // Extra Charges/Services
  extraCharges: {
    extraCharge1: 'Extra_Charge_1',
    extraCharge2: 'Extra_Charge_2',
    extraCharge3: 'Extra_Charge_3',
    extraCharge4: 'Extra_Charge_4',
  },
  // Other Charges
  handlingCharge: 'Handling_Charge',
  retailCharge: 'Retail_Total',
  contractCharge: 'Contract_Total',
  // Manual Description
  description: 'Manual_Description',
  // Mailing Specific Data
  mailing: {
    isPresort: 'Mailing_Presort',
    ascRegisterStart: 'Mailing_ASC_Start',
    ascRegisterEnd: 'Mailing_ASC_End',
    descRegisterStart: 'Mailing_DESC_Start',
    descRegisterEnd: 'Mailing_DESC_End',
    meterNumber: 'Mailing_Serial_Number',
    offline: 'Mailing_Offline',
    mailPieceID: 'Mailing_Piece_ID',
  },
  // Tag added to object when its canceled in SMART
  void: 'Canceled',
};

exports.cancel = {
  id: 'Item_ID',
  createdDate: 'Created_Date',
  shippedDate: 'Shipped_Date',
  canceledDate: 'Canceled_Date',
  packageId: 'Package_ID',
  level1: 'Account_Number_1',
  level2: 'Account_Number_2',
  level3: 'Account_Number_3',
  level4: 'Account_Number_4',
  level5: 'Account_Number_5',
  carrier: 'Carrier',
  service: 'Service',
  serviceName: 'Service_Name',
  pieceCount: 'Pieces',
  totalCharge: 'Total_Charge',
  masterTrackingNum: 'Master_Tracking_Num',
};

// Package ID Lookup
exports.packageLookup = async function (searchString) {
  let results = packageScript.packageLookup(searchString);
  return results;
};

// Address Lookup Function
exports.addressSearch = async function (searchString, field) {
  let results = addressScript.addressSearch(searchString, field);
  return results;
};

// Account Search Function
exports.accountSearch = async function (searchString, level) {
  let results = accountScript.accountSearch(searchString, level);
  return results;
};

// After Shipment Process Function
exports.publishShipment = function (record, batch) {
  afterShipScript.publishShipment(record, batch);
};

// After Shipment Void function
exports.afterVoid = function (record) {
  afterCancelScript.afterVoid(record);
};

// Sets the final format for the CSV file output for After Record
exports.csvFormat = function (data, layout) {
  let results = {
    [layout.id]: data[layout.id],
    [layout.shippedDate]: data[layout.shippedDate],
    [layout.packageId]: data[layout.packageId],
    [layout.costcenter.level1]: data[layout.costcenter.level1],
    [layout.costcenter.level2]: data[layout.costcenter.level2],
    [layout.costcenter.level3]: data[layout.costcenter.level3],
    [layout.costcenter.level4]: data[layout.costcenter.level4],
    [layout.costcenter.level5]: data[layout.costcenter.level5],
    [layout.carrier]: data[layout.carrier],
    [layout.service]: data[layout.service],
    [layout.serviceName]: data[layout.serviceName],
    [layout.pieceCount]: data[layout.pieceCount],
    [layout.parcels.weight.value]: data[layout.parcels.weight.value],
    [layout.charges.totalCharge]: data[layout.charges.totalCharge],
    [layout.masterTrackingNum]: data[layout.masterTrackingNum],
    [layout.createdDate]: data[layout.createdDate],
  };
  return results;
};
