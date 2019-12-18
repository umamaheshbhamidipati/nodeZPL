var net = require('net');
const WebSocket = require('ws');
var webSocketServer = require('ws').Server;

var wss = new webSocketServer({ port: 8080 });

// we are opening from here only
var clientConnection = new WebSocket('ws://localhost:8080');
clientConnection.onopen = function () {
	console.log("Connected to the signaling server");
};

var server = net.createServer(function (socket) {
	socket.write('Echo server\r\n');
	socket.on('data', function (data) {
		// console.log(data);
		textChunk = data.toString('utf8');
		console.log("textChunk>>>>>>", textChunk);

		clientConnection.send(JSON.stringify(textChunk));

		socket.write(textChunk);
	});
});

wss.on('connection', function (connection) {
    console.log("user connected..");

    connection.on('message', function (message) {

        console.log("meesage>>>>>>>>", message);
        //accepting only JSON messages
        try {
            data = JSON.parse(message);
        } catch (e) {
            console.log("Invalid JSON");
            data = {};
        }
        sendAll(message);
    })
});

function sendAll(message) {
    let cl = Array.from(wss.clients);
    for (var i = 0; i < cl.length; i++) {
        cl[i].send(message);
    }
}

server.listen(1337, '192.168.3.6');
