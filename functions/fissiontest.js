// const grpc = require('grpc');

// const people_proto = grpc.load('./people.proto').people;
// const credentials = grpc.credentials.createInsecure()
// const localhost =  '192.168.99.100:'
// const port = (process.env.PORT || '31040')

// var namesClient = new people_proto.Names(localhost+port, credentials)

module.exports = function(context, callback) {
    callback(200, "Hello, world!\n");
 //    return namesClient.getNames(Request, function(error, response) {

	// 	if (error == null) {
	// 		console.log(response)
	// 		callback(200, response);
	// 	} else {
	// 		console.log(error)
	// 		callback(500, error);
	// 	}

	// })

}
