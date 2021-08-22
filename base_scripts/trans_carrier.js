'use strict';
// Set the customer info to the actual customer file you are using
const cust = require('../customer_sql/sql_cust');

// Chooses which carrier to translate
exports.translateCarrier = function (data) {
  switch (data.carrier) {
    case 'DHL':
      transDHL(data);
      break;
    case 'FEDEX':
      transFEDEX(data);
      break;
    case 'UPS':
      transUPS(data);
      break;
    case 'USPS':
      transUSPS(data);
  }
};

// Translates DHL services
function transDHL(data) {
  switch (data.service) {
    case cust.dhlTrans.intlExpEnv:
      data.service = 'INTL_XP_ENV';
      break;
    case 'INTL_XP_ENV':
      data.service = cust.dhlTrans.intlExpEnv;
      break;
    case cust.dhlTrans.expWorldWide:
      data.service = 'WW_XP';
      break;
    case 'WW_XP':
      data.service = cust.dhlTrans.expWorldWide;
      break;
    default:
      data.service = data.service;
  }
}

// Translates FedEx services
function transFEDEX(data) {
  switch (data.service) {
    case cust.fedexTrans.firstOvernight:
      data.service = 'FIRST_OVERNIGHT';
      break;
    case 'FIRST_OVERNIGHT':
      data.service = cust.fedexTrans.firstOvernight;
      break;
    case cust.fedexTrans.priorityOvernight:
      data.service = 'PRIORITY_OVERNIGHT';
      break;
    case 'PRIORITY_OVERNIGHT':
      data.service = cust.fedexTrans.priorityOvernight;
      break;
    case cust.fedexTrans.standardOvernight:
      data.service = 'STANDARD_OVERNIGHT';
      break;
    case 'STANDARD_OVERNIGHT':
      data.service = cust.fedexTrans.standardOvernight;
      break;
    case cust.fedexTrans.twoDay:
      data.service = 'FEDEX_2_DAY';
      break;
    case 'FEDEX_2_DAY':
      data.service = cust.fedexTrans.twoDay;
      break;
    case cust.fedexTrans.twoDayAM:
      data.service = 'FEDEX_2_DAY_AM';
      break;
    case 'FEDEX_2_DAY_AM':
      data.service = cust.fedexTrans.twoDayAM;
      break;
    case cust.fedexTrans.expressSaver:
      data.service = 'FEDEX_EXPRESS_SAVER';
      break;
    case 'FEDEX_EXPRESS_SAVER':
      data.service = cust.fedexTrans.expressSaver;
      break;
    case cust.fedexTrans.firstOvernightFreight:
      data.service = 'FEDEX_FIRST_FREIGHT';
      break;
    case 'FEDEX_FIRST_FREIGHT':
      data.service = cust.fedexTrans.firstOvernightFreight;
      break;
    case cust.fedexTrans.oneDayFreight:
      data.service = 'FEDEX_1_DAY_FREIGHT';
      break;
    case 'FEDEX_1_DAY_FREIGHT':
      data.service = cust.fedexTrans.oneDayFreight;
      break;
    case cust.fedexTrans.twoDayFreight:
      data.service = 'FEDEX_2_DAY_FREIGHT';
      break;
    case 'FEDEX_2_DAY_FREIGHT':
      data.service = cust.fedexTrans.twoDayFreight;
      break;
    case cust.fedexTrans.threeDayFreight:
      data.service = 'FEDEX_3_DAY_FREIGHT';
      break;
    case 'FEDEX_3_DAY_FREIGHT':
      data.service = cust.fedexTrans.threeDayFreight;
      break;
    case cust.fedexTrans.ground:
      data.service = 'FEDEX_GROUND';
      break;
    case 'FEDEX_GROUND':
      data.service = cust.fedexTrans.ground;
      break;
    case cust.fedexTrans.homeDelivery:
      data.service = 'GROUND_HOME_DELIVERY';
      break;
    case 'GROUND_HOME_DELIVERY':
      data.service = cust.fedexTrans.homeDelivery;
      break;
    case cust.fedexTrans.smartPostMedia:
      data.service = 'SMART_POST_MEDIA_MAIL';
      break;
    case 'SMART_POST_MEDIA_MAIL':
      data.service = cust.fedexTrans.smartPostMedia;
      break;
    case cust.fedexTrans.smartPostParcelSelect:
      data.service = 'SMART_POST_PARCEL_SELECT';
      break;
    case 'SMART_POST_PARCEL_SELECT':
      data.service = cust.fedexTrans.smartPostParcelSelect;
      break;
    case cust.fedexTrans.smartPostPresortStandard:
      data.service = 'SMART_POST_PRESORTED_STANDARD';
      break;
    case 'SMART_POST_PRESORTED_STANDARD':
      data.service = cust.fedexTrans.smartPostPresortStandard;
      break;
    case cust.fedexTrans.smartPostPresortBPM:
      data.service = 'SMART_POST_PRESORTED_BOUND_PRINTED_MATTER';
      break;
    case 'SMART_POST_PRESORTED_BOUND_PRINTED_MATTER':
      data.service = cust.fedexTrans.smartPostPresortBPM;
      break;
    case cust.fedexTrans.smartPostParcelReturn:
      data.service = 'SMART_POST_PARCEL_RETURN';
      break;
    case 'SMART_POST_PARCEL_RETURN':
      data.service = cust.fedexTrans.smartPostParcelReturn;
      break;
    case cust.fedexTrans.intlEconomy:
      data.service = 'INTERNATIONAL_ECONOMY';
      break;
    case 'INTERNATIONAL_ECONOMY':
      data.service = cust.fedexTrans.intlEconomy;
      break;
    case cust.fedexTrans.intlGround:
      data.service = 'FEDEX_GROUND';
      break;
    case 'FEDEX_GROUND':
      data.service = cust.fedexTrans.intlGround;
      break;
    case cust.fedexTrans.intlFirst:
      data.service = 'INTERNATIONAL_FIRST';
      break;
    case 'INTERNATIONAL_FIRST':
      data.service = cust.fedexTrans.intlFirst;
      break;
    case cust.fedexTrans.intlPriority:
      data.service = 'INTERNATIONAL_PRIORITY';
      break;
    case 'INTERNATIONAL_PRIORITY':
      data.service = cust.fedexTrans.intlPriority;
      break;
    case cust.fedexTrans.intlExpress:
      data.service = 'INTERNATIONAL_PRIORITY_EXPRESS';
      break;
    case 'INTERNATIONAL_PRIORITY_EXPRESS':
      data.service = cust.fedexTrans.intlExpress;
      break;
    case cust.fedexTrans.intlPriorityFreight:
      data.service = 'INTERNATIONAL_PRIORITY_FREIGHT';
      break;
    case 'INTERNATIONAL_PRIORITY_FREIGHT':
      data.service = cust.fedexTrans.intlPriorityFreight;
      break;
    case cust.fedexTrans.intlEconomyFreight:
      data.service = 'INTERNATIONAL_ECONOMY_FREIGHT';
      break;
    case 'INTERNATIONAL_ECONOMY_FREIGHT':
      data.service = cust.fedexTrans.intlEconomyFreight;
      break;
    default:
      data.service = data.service;
  }
}

// Translates UPS services
function transUPS(data) {
  switch (data.service) {
    case cust.upsTrans.nextDayAir:
      data.service = '01';
      break;
    case '01':
      data.service = cust.upsTrans.nextDayAir;
      break;
    case cust.upsTrans.twoDayAir:
      data.service = '02';
      break;
    case '02':
      data.service = cust.upsTrans.twoDayAir;
      break;
    case cust.upsTrans.ground:
      data.service = '03';
      break;
    case '03':
      data.service = cust.upsTrans.ground;
      break;
    case cust.upsTrans.twoDayAirAM:
      data.service = '59';
      break;
    case '59':
      data.service = cust.upsTrans.twoDayAirAM;
      break;
    case cust.upsTrans.nextDayEarly:
      data.service = '14';
      break;
    case '14':
      data.service = cust.upsTrans.nextDayEarly;
      break;
    case cust.upsTrans.airSaver:
      data.service = '13';
      break;
    case '13':
      data.service = cust.upsTrans.airSaver;
      break;
    case cust.upsTrans.threeDaySelect:
      data.service = '12';
      break;
    case '12':
      data.service = cust.upsTrans.threeDaySelect;
      break;
    case cust.upsTrans.surePostLess:
      data.service = 'SUREPOST_LESS_THAN_1LB';
      break;
    case 'SUREPOST_LESS_THAN_1LB':
      data.service = cust.upsTrans.surePostLess;
      break;
    case cust.upsTrans.surePostHeavy:
      data.service = 'SUREPOST_1LB_OR_GREATER';
      break;
    case 'SUREPOST_1LB_OR_GREATER':
      data.service = cust.upsTrans.surePostHeavy;
      break;
    case cust.upsTrans.surePostBPM:
      data.service = 'SUREPOST_BOUND_PRINTED_MATTER';
      break;
    case 'SUREPOST_BOUND_PRINTED_MATTER':
      data.service = cust.upsTrans.surePostBPM;
      break;
    case cust.upsTrans.surePostMedia:
      data.service = 'SUREPOST_MEDIA';
      break;
    case 'SUREPOST_MEDIA':
      data.service = cust.upsTrans.surePostMedia;
      break;
    case cust.upsTrans.intlExpress:
      data.service = '07';
      break;
    case '07':
      data.service = cust.upsTrans.intlExpress;
      break;
    case cust.upsTrans.intlExpressPlus:
      data.service = '54';
      break;
    case '54':
      data.service = cust.upsTrans.intlExpressPlus;
      break;
    case cust.upsTrans.intlExpedited:
      data.service = '08';
      break;
    case '08':
      data.service = cust.upsTrans.intlExpedited;
      break;
    case cust.upsTrans.intlSaver:
      data.service = '65';
      break;
    case '65':
      data.service = cust.upsTrans.intlSaver;
      break;
    case cust.upsTrans.intlStandard:
      data.service = '11';
      break;
    case '11':
      data.service = cust.upsTrans.intlStandard;
      break;
    default:
      data.service = data.service;
  }
}

// Translates USPS, including mailing, services.  Mailing is after ship ONLY!!!
function transUSPS(data) {
  switch (data.service) {
    case cust.uspsTrans.firstClassPackageService:
      data.service = 'FCP';
      break;
    case 'FCP':
      data.service = cust.uspsTrans.firstClassPackageService;
      break;
    case cust.uspsTrans.priority:
      data.service = 'PM';
      break;
    case 'PM':
      data.service = cust.uspsTrans.priority;
      break;
    case cust.uspsTrans.express:
      data.service = 'EM';
      break;
    case 'EM':
      data.service = cust.uspsTrans.express;
      break;
    case cust.uspsTrans.library:
      data.service = 'LM';
      break;
    case 'LM':
      data.service = cust.uspsTrans.library;
      break;
    case cust.uspsTrans.media:
      data.service = 'MM';
      break;
    case 'MM':
      data.service = cust.uspsTrans.media;
      break;
    case cust.uspsTrans.parcelSelect:
      data.service = 'PS';
      break;
    case 'PS':
      data.service = cust.uspsTrans.parcelSelect;
      break;
    case cust.uspsTrans.boundPrintedMatter:
      data.service = 'BPM';
      break;
    case 'BPM':
      data.service = cust.uspsTrans.boundPrintedMatter;
      break;
    case cust.uspsTrans.intlFirstClassPackageSerivce:
      data.service = 'FCPIS';
      break;
    case 'FCPIS':
      data.service = cust.uspsTrans.intlFirstClassPackageSerivce;
      break;
    case cust.uspsTrans.intlPriority:
      data.service = 'PMI';
      break;
    case 'PMI':
      data.service = cust.uspsTrans.intlPriority;
      break;
    case cust.uspsTrans.intlExpress:
      data.service = 'EMI';
      break;
    case 'EMI':
      data.service = cust.uspsTrans.intlExpress;
      break;
    case '0':
      data.service = cust.uspsTrans.firstClass;
      break;
    case '1':
      data.service = cust.uspsTrans.firstClassPresort;
      break;
    case '2':
      data.service = cust.uspsTrans.firstClassPresortAuto;
      break;
    case '3':
      data.service = cust.uspsTrans.priority;
      break;
    case '4':
      data.service = cust.uspsTrans.priorityFlatRate;
      break;
    case '5':
      data.service = cust.uspsTrans.express;
      break;
    case '6':
      data.service = cust.uspsTrans.expressFlatRate;
      break;
    case '7':
      data.service = cust.uspsTrans.retailGround;
      break;
    case '8':
      data.service = cust.uspsTrans.parcelSelectDDU;
      break;
    case '9':
      data.service = cust.uspsTrans.library;
      break;
    case '10':
      data.service = cust.uspsTrans.media;
      break;
    case '11':
      data.service = cust.uspsTrans.intlFirstClass;
      break;
    case '12':
      data.service = cust.uspsTrans.intlExpress;
      break;
    case '13':
      data.service = cust.uspsTrans.intlPriority;
      break;
    case '14':
      data.service = cust.uspsTrans.globalExpress;
      break;
    case '16':
      data.service = cust.uspsTrans.mktComNonAuto;
      break;
    case '17':
      data.service = cust.uspsTrans.mktComAuto;
      break;
    case '18':
      data.service = cust.uspsTrans.mktNPNonAuto;
      break;
    case '19':
      data.service = cust.uspsTrans.mktNPAuto;
      break;
    case '20':
      data.service = cust.uspsTrans.mktComNonAutoDSCF;
      break;
    case '21':
      data.service = cust.uspsTrans.mktComAutoDSCF;
      break;
    case '22':
      data.service = cust.uspsTrans.mktNPNonAutoDSCF;
      break;
    case '23':
      data.service = cust.uspsTrans.mktNPAutoDSCF;
      break;
    case '24':
      data.service = cust.uspsTrans.carrierRouteLetter;
      break;
    case '31':
      data.service = cust.uspsTrans.carrierRouteFlat;
      break;
    case '42':
      data.service = cust.uspsTrans.intlPriorityFlatRate;
      break;
    case '43':
      data.service = cust.uspsTrans.intlExpressFlatRate;
      break;
    case '44':
      data.service = cust.uspsTrans.firstClassPackageService;
      break;
    case '45':
      data.service = cust.uspsTrans.intlFirstClassPackageSerivce;
      break;
    default:
      data.service = data.service;
  }
}
