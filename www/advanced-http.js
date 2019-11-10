/*
 * A native HTTP Plugin for Cordova / PhoneGap.
 */

var pluginId = module.id.slice(0, module.id.lastIndexOf('.'));

var exec = require('cordova/exec');
var base64 = require('cordova/base64');
var messages = require(pluginId + '.messages');
var errorCodes = require(pluginId + '.error-codes');
var globalConfigs = require(pluginId + '.global-configs');
var jsUtil = require(pluginId + '.js-util');
var ToughCookie = require(pluginId + '.tough-cookie');
var lodash = require(pluginId + '.lodash');
var WebStorageCookieStore = require(pluginId + '.local-storage-store')(ToughCookie, lodash);
var cookieHandler = require(pluginId + '.cookie-handler')(window.localStorage, ToughCookie, WebStorageCookieStore);
var dependencyValidator = require(pluginId + '.dependency-validator')(window.FormData, window.console, messages);
var helpers = require(pluginId + '.helpers')(window, jsUtil, cookieHandler, messages, base64, errorCodes, dependencyValidator);
var urlUtil = require(pluginId + '.url-util')(jsUtil);
var publicInterface = require(pluginId + '.public-interface')(exec, cookieHandler, urlUtil, helpers, globalConfigs, errorCodes);

dependencyValidator.logWarnings();

module.exports = publicInterface;
