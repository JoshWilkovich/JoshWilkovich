'use strict';
// Scripts/functions in use
const accountScript = require('./api_accounts');
const addressScript = require('./api_address');
const packageScript = require('./api_package');
const afterShipScript = require('./api_after_ship');
const afterCancelScript = require('./api_after_cancel');

// SCRIPT DETAILS TO SHOW IN RTI CONNECTOR
// Customer Name
exports.customer = 'API Company';

// Author:  Josh Wilkovich
exports.creator = 'Quadient Professional Services';

// Version of the integration
exports.version = '1.0.0';

// CUSTOMER OPTIONS
exports.enableCarrierTransPackageID = false;
exports.enableCarrierTransAfterShip = false;
exports.enableMailingConsolidation = false;

// Base API URL to call
exports.apiURL = 'http://localhost:1337/';

// SQL TABLES, VIEWS AND COLUMN LAYOUTS

// Table that holds accounts
exports.account = {
  tableName: 'Accounts',
  code: 'Account_Number', // REQUIRED
  name: 'Account_Name', // REQUIRED
  level: 'Account_Level', // REQUIRED
};

// Table that holds addresses
exports.address = {
  tableName: 'Addresses',
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
  isResidential: 'ResFlag',
  email: 'Email',
  phone1: 'Phone', // REQUIRED
  saveAddress: 'Save_Address',
};

// Table that holds the Package Lookup information
exports.package = {
  tableName: 'Package',
  packageId: 'Order_Num', // Lookup Field - REQUIRED
  transactionType: 'SHIPPING',
  isRts: 'Is_RTS',
  // Shipping Details
  carrier: 'Carrier',
  service: 'Service_Code',
  serviceName: 'Service_Name',
  shippingDate: 'Ship_Date',
  // Ship From details
  shipFrom: {
    name: 'Ship_From_Attention',
    companyName: 'Ship_From_Company',
    address1: 'Ship_From_Add1',
    address2: 'Ship_From_Add2',
    address3: 'Ship_From_Add3',
    city: 'Ship_From_City',
    stateProvince: 'Ship_From_State',
    postalCode: 'Ship_From_ZIP',
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
    isUSTerritory: 'Ship_To_Is_US_Terr',
    email: 'Ship_To_Email',
    phone1: 'Ship_To_Phone',
  },
  // Package Details
  numOfPackages: 'Num_of_Packages',
  parcels: {
    number: '0',
    dim: {
      length: 'Length',
      width: 'Width',
      height: 'Height',
      girth: 'Girth',
      units: 'IN',
    },
    weight: {
      value: 'Weight',
      units: 'LB',
    },
    packaging: 'Package_Type',
    packagingName: 'Package_Name',
  },
  // Billing Details
  billingDetails: {
    billingType: 'Billing_Type',
    accountNumber: 'Billing_Acct_Num',
    postalCode: 'Billing_Acct_ZIP',
    countryCode: 'Billing_Acct_Country',
  },
  // Account Numbers
  costcenter: {
    level1: 'Account_Number_1',
    level2: 'Account_Number_2',
    level3: 'Account_Number_3',
    level4: 'Account_Number_4',
    level5: 'Account_Number_5',
  },
  // Account Names
  costcenter_name: {
    level1: 'Account_Name_1',
    level2: 'Account_Name_2',
    level3: 'Account_Name_3',
    level4: 'Account_Name_4',
    level5: 'Account_Name_5',
  },
  // Reference Fields
  references: {
    reference1: 'Reference_Field_1',
    reference2: 'Reference_Field_2',
    reference3: 'Reference_Field_3',
    reference4: 'Reference_Field_4',
    reference5: 'Reference_Field_5',
  },
  // Customs Information
  customsForm: 'Customs_Form',
  customs: {
    contents_type: 'Customs_Type',
    non_delivery_option: 'Customs_Del_Opt',
    contents_description: 'Customs_Contents',
    comments: 'Customs_Comments',
    customs_refnum_sender: 'Customs_Refnum_Sender',
    invoice_number: 'Customs_Invoice_Number',
    certificate_number: 'Customs_Cert_Number',
    license_number: 'Customs_License_Number',
    contents_items: {
      parcel_num: 0,
      description: 'Customs_Con_Desc',
      origin_country: 'US',
      hs_tariff: 'Customs_Tariff',
      quantity: 'Customs_Qty',
      weight: {
        value: 'Customs_Weight',
        units: 'LB',
      },
      value: {
        value: 'Customs_Value',
        currency: 'USD',
      },
    },
    customs_refnum_importer: 'Customs_Refnum_Importer',
    eelpfc: 'Customs_EELPFC',
  },
  // Notification Settings
  notifications: {
    sendNotifications: 'Send_Notifications',
    shipperEmail: 'Email_Shipper',
    shipperSettings: 'Email_Shipper_Settings',
    recipientEmail: 'Email_Recipient',
    recipientSettings: 'Email_Recipient_Settings',
    thirdPartyEmail: 'Email_3rdParty',
    thirdPartySettings: 'Email_3rdParty_Settings',
  },
  // Used for Updating with shipment details
  update: {
    id: 'Item_ID',
    trackingNumber: 'Tracking_Number',
    totalCharge: 'Total_Charges',
  },
};

// Table that holds the shipment storage information
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

// CARRIER TRANSLATIONS
exports.dhlTrans = {
  intlExpEnv: 'ENVELOPE',
  expWorldWide: 'PACKAGE',
};

exports.fedexTrans = {
  firstOvernight: '1st Overnight',
  priorityOvernight: 'Priority',
  standardOvernight: 'Standard',
  twoDay: '2-Day',
  twoDayAM: '2-Day AM',
  expressSaver: 'Saver',
  firstOvernightFreight: '1st Freight',
  oneDayFreight: '1 Day Freight',
  twoDayFreight: '2 Day Freight',
  threeDayFreight: '3 Day Freight',
  ground: 'Ground',
  homeDelivery: 'Home',
  smartPostMedia: 'Smart Media',
  smartPostParcelSelect: 'Smart Select',
  smartPostPresortStandard: 'Smart Standard',
  smartPostPresortBPM: 'Smart BPM',
  smartPostParcelReturn: 'Smart Return',
  intlEconomy: 'INTL Eco',
  intlGround: 'INTL GRD',
  intlFirst: 'INTL 1st',
  intlPriority: 'INTL Pri',
  intlExpress: 'INTL Exp',
  intlPriorityFreight: 'INTL PF',
  intlEconomyFreight: 'INTL EF',
};

exports.upsTrans = {
  nextDayAir: 'Overnight',
  twoDayAir: '2-Day',
  ground: 'Ground',
  twoDayAirAM: '2-Day AM',
  nextDayEarly: '1st Overnight',
  airSaver: 'Saver',
  threeDaySelect: '3 Day',
  surePostLess: 'Surepost',
  surePostHeavy: 'Surepost Heavy',
  surePostBPM: 'Surepost BPM',
  surePostMedia: 'Surepost Media',
  intlExpress: 'INTL Express',
  intlExpressPlus: 'INTL Plus',
  intlExpedited: 'INTL Expedited',
  intlSaver: 'INTL Saver',
  intlStandard: 'INTL Standard',
};

exports.uspsTrans = {
  firstClass: 'First Class',
  firstClassPresort: 'Presort',
  firstClassPresortAuto: 'Auto Presort',
  firstClassPackageService: 'FCPS',
  priority: 'Priority',
  priorityFlatRate: 'Priority FR',
  express: 'Express',
  expressFlatRate: 'Express FR',
  library: 'Library',
  media: 'Media',
  retailGround: 'Retail Ground',
  parcelSelect: 'Ground',
  parcelSelectDDU: 'PS DDU',
  boundPrintedMatter: 'BPM',
  mktComNonAuto: 'Mkt Com Non Auto',
  mktComNonAutoDSCF: 'DSCF - Mkt Com Non Auto',
  mktComAuto: 'Mkt Com Auto',
  mktComAutoDSCF: 'DSCF - Mkt Com Auto',
  mktNPNonAuto: 'Mkt NP Non Auto',
  mktNPNonAutoDSCF: 'DSCF - Mkt NP Non Auto',
  mktNPAuto: 'Mkt NP Auto',
  mktNPAutoDSCF: 'DSCF - Mkt NP Auto',
  carrierRouteLetter: 'CR Letter',
  carrierRouteFlat: 'CR Flat',
  intlFirstClass: 'Intl 1st Class',
  intlFirstClassPackageSerivce: 'FCPIS',
  intlPriority: 'Priority Intl',
  intlPriorityFlatRate: 'PMI FR',
  intlExpress: 'Express Intl',
  intlExpressFlatRate: 'PMEI FR',
  globalExpress: 'GXG',
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
exports.publishShipment = async function (record, batch) {
  afterShipScript.publishShipment(record, batch);
};

// After Shipment Void function
exports.afterVoid = async function (record) {
  afterCancelScript.afterVoid(record);
};
