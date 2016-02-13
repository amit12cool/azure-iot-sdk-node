// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

var Base = require('azure-iot-amqp-base').Amqp;
var endpoint = require('azure-iot-common').endpoint;
var PackageJson = require('../package.json');

/**
 * @class       module:azure-iothub.Amqp
 * @classdesc   Constructs an {@linkcode Amqp} object that can be used in an application
 *              to connect to IoT Hub instance, using the AMQP protocol.
 */
/*Codes_SRS_NODE_IOTHUB_SERVICE_AMQP_16_001: [The Amqp constructor shall accept a config object with those 4 properties:
host – (string) the fully-qualified DNS hostname of an IoT Hub
hubName - (string) the name of the IoT Hub instance (without suffix such as .azure-devices.net).
keyName – (string) the name of a key that can be used to communicate with the IoT Hub instance
sharedAccessSignature – (string) the key associated with the key name.] */
function Amqp(config) {
  var uri = 'amqps://';
  uri += encodeURIComponent(config.keyName) +
         '%40sas.root.' +
         config.hubName +
         ':' +
         encodeURIComponent(config.sharedAccessSignature) +
         '@' +
         config.host;

  this._amqp = new Base(uri, true, 'azure-iothub/' + PackageJson.version);
  this._config = config;
}

/**
 * @method             module:azure-iothub.Amqp#connect
 * @description        Establishes a connection with the IoT Hub instance.
 * @param {Function}   done   Called when the connection is established of if an error happened.
 */
/*Codes_SRS_NODE_IOTHUB_SERVICE_AMQP_16_009: [The done callback method passed in argument shall be called if the connection is established] */
/*Codes_SRS_NODE_IOTHUB_SERVICE_AMQP_16_010: [The done callback method passed in argument shall be called with an error object if the connection fails] */
Amqp.prototype.connect = function connect(done) {
  this._amqp.connect(done);
};

/**
 * @method             module:azure-iothub.Amqp#disconnect
 * @description        Disconnects the link to the IoT Hub instance.
 * @param {Function}   done   Called when disconnected of if an error happened.
 */
/*Codes_SRS_NODE_IOTHUB_SERVICE_AMQP_16_011: [The done callback method passed in argument shall be called when disconnected]*/
/*Codes_SRS_NODE_IOTHUB_SERVICE_AMQP_16_012: [The done callback method passed in argument shall be called with an error objec if disconnecting fails]*/
Amqp.prototype.disconnect = function disconnect(done) {
  this._amqp.disconnect(done);
};

/**
 * @method             module:azure-iothub.Amqp#send
 * @description        Sends a message to the IoT Hub.
 * @param {Message}  message    The [message]{@linkcode module:common/message.Message}
 *                              to be sent.
 * @param {Function} done       The callback to be invoked when `send`
 *                              completes execution.
 */
/*Codes_SRS_NODE_IOTHUB_SERVICE_AMQP_16_002: [The send method shall construct an AMQP request using the message passed in argument as the body of the message.]*/
/*Codes_SRS_NODE_IOTHUB_SERVICE_AMQP_16_003: [The message generated by the send method should have its “to” field set to the device ID passed as an argument.]*/
/*Codes_SRS_NODE_IOTHUB_SERVICE_AMQP_16_004: [The send method shall call the done() callback with no arguments when the message has been successfully sent.]*/
/*Codes_SRS_NODE_IOTHUB_SERVICE_AMQP_16_005: [If send encounters an error before it can send the request, it shall invoke the done callback function and pass the standard JavaScript Error object with a text description of the error (err.message).]*/
Amqp.prototype.send = function send(deviceId, message, done) {
  var serviceEndpoint = '/messages/devicebound';
  var deviceEndpoint = endpoint.messagePath(encodeURIComponent(deviceId));
  this._amqp.send(message, serviceEndpoint, deviceEndpoint, done);
};

/**
 * @method             module:azure-iothub.Amqp#getReceiver
 * @description        Gets the {@linkcode AmqpReceiver} object that can be used to receive messages from the IoT Hub instance and accept/reject/release them.
 * @param {Function}  done      Callback used to return the {@linkcode AmqpReceiver} object.
 */
/*Codes_SRS_NODE_IOTHUB_SERVICE_AMQP_16_007: [If a receiver for this endpoint has already been created, the getReceiver method should call the done() method with the existing instance as an argument.]*/
/*Codes_SRS_NODE_IOTHUB_SERVICE_AMQP_16_008: [If a receiver for this endpoint doesn’t exist, the getReceiver method should create a new AmqpReceiver object and then call the done() method with the object that was just created as an argument.]*/
Amqp.prototype.getReceiver = function getFeedbackReceiver(done) {
  var feedbackEndpoint = '/messages/serviceBound/feedback';
  this._amqp.getReceiver(feedbackEndpoint, done);
};

module.exports = Amqp;