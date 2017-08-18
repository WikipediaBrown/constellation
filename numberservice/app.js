'use strict';

const grpc = require('grpc');

// Constants, credentials and proto files
const people_proto = grpc.load('./people.proto').people;
const credentials = grpc.ServerCredentials.createInsecure()
const localhost =  '0.0.0.0:'
const port = (process.env.PORT || '8080')

const listOfNumbers = [1234123, 234, 27, 502, 8989]


// RPC functions
const getBadgeNumber = function(call, callback) {
	console.log('getBadgeNumber Called')
	const id = call.request.id;

	if (id > 0 && id < 6) {
		callback(null, listOfNumbers[id - 1]);
	} else {
		callback(null, listOfNumbers[3]);
	}
}


// Create GRPC Server
var grpcServer = new grpc.Server();

// Prepair Numbers service and register numbers functions
const badgeNumberService = people_proto.GetBadgeNumber.service;
const badgeNumberFunctions = {getBadgeNumber: getBadgeNumber}

// Add service and functions to server
grpcServer.addService(badgeNumberService, badgeNumberFunctions);

// Bind server to port and set credentials
grpcServer.bind(localhost+port, credentials)

// Start server
grpcServer.start();
console.log('Server is listending at http://%s%s', localhost, port);
