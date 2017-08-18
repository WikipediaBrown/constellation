'use strict';

const grpc = require('grpc');

// Constants, credentials and proto files
const names_proto = grpc.load('./information.proto').information;
const credential = grpc.ServerCredentials.createInsecure()
const localhost =  '0.0.0.0:'
const port = (process.env.PORT || '8080')

// RPC functions
const getNames = function(call) {
	console.log('GetNames Called')
	call.write()
	call.end
}


// Create GRPC Server
var grpcServer = grpc.Server();

// Prepair Names service and register names functions
const namesService = names_proto.names.service;
const namesFunctions = {getNames: getNames}

// add service and functions to server
grpcServer.addService(namesService, namesFunctions);

// Bind server to port and set credentials
grpcServer.bind(localhost+port, credentials)

// Start server
grpcServer.start();
console.log('Server is listending at http:${localhost}:${port}');
