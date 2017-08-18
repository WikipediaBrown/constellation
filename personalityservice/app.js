'use strict';

const grpc = require('grpc');

// Constants, credentials and proto files
const people_proto = grpc.load('./people.proto').people;
const credentials = grpc.ServerCredentials.createInsecure()
const localhost =  '0.0.0.0:'
const port = (process.env.PORT || '9090')

const listOfNames = ['Cool', 'Super\' Nerd', 'Lover, !Fighter', 'Sweet', 'Morose']

// RPC functions
const GetPersonality = function(call, callback) {
	console.log('GetNames Called')
	const id = call.request.id;

	if (id > 0 && id < 6) {
		callback(null, listOfNames[id - 1]);
	} else {
		callback(null, listOfNames[3]);
	}
}


// Create GRPC Server
var grpcServer = new grpc.Server();

// Prepair Names service and register names functions
const personalityService = people_proto.GetPersonality.service;
const personalityFunctions = {GetPersonality: GetPersonality}

// add service and functions to server
grpcServer.addService(personalityService, personalityFunctions);

// Bind server to port and set credentials
grpcServer.bind(localhost+port, credentials)

// Start server
grpcServer.start();
console.log('Server is listending at http://%s%s', localhost, port);
