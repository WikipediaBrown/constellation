'use strict';

const grpc = require('grpc');

// Constants, credentials and proto files
const people_proto = grpc.load('./people.proto').people;
const credentials = grpc.ServerCredentials.createInsecure()
const localhost =  '0.0.0.0:'
const port = (process.env.PORT || '7070')

const listOfNames = ['Earl', 'Ole\' Greg', 'Seargant Slaughter', 'The Dark Knight', 'Gil']

// RPC functions
const getNames = function(call, callback) {
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
const namesService = people_proto.Names.service;
const namesFunctions = {getNames: getNames}

// add service and functions to server
grpcServer.addService(namesService, namesFunctions);

// Bind server to port and set credentials
grpcServer.bind(localhost+port, credentials)

// Start server
grpcServer.start();
console.log('Server is listending at http://%s%s', localhost, port);
