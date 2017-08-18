const grpc = require('grpc');

const people_proto = grpc.load('./people.proto').people;
const credentials = grpc.credentials.createInsecure()
const localhost =  '192.168.99.100:'
const port = (process.env.PORT || '31040')

var namesClient = new people_proto.Names(localhost+port, credentials)

// var numbersClient = new people_proto.GetBadgeNumber(localhost+port credentials)

// var personalityClient = new people_proto.GetPersonality(localhost+port credentials)

const Request = {id: 2}

const namesCall = namesClient.getNames(Request, function(error, response) {
	// console.log(error)
	console.log(response)
})

// const numbersCall = namesClient.getNames(Request, function(error, response) {
// 	// console.log(error)
// 	console.log(response)
// })

// const personalityCall = namesClient.getNames(Request, function(error, response) {
// 	// console.log(error)
// 	console.log(response)
// })