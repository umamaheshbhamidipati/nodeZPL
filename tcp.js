var net = require('net');
const WebSocket = require('ws');
var webSocketServer = require('ws').Server;

var wss = new webSocketServer({ port: 8080 });
var CLIENTS = [];

wss.getUniqueID = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};

var server = net.createServer(function (socket) {
    socket.write('Echo server\r\n');
    socket.on('data', function (data) {
        // console.log(data);
        textChunk = data.toString('utf8');
        console.log("textChunk>>>>>>", textChunk);

        clientConnection.send(JSON.stringify(textChunk));
        console.log(socket.address());
        socket.write(textChunk);
    });
});

wss.on('connection', function (connection) {
    console.log("user connected..");
    connection.on('message', function (message) {

        console.log("meesage>>>>>>>>", message);
        //accepting only JSON messages
        // try {
        //     data = JSON.parse(message);
        // } catch (e) {
        //     console.log("Invalid JSON");
        //     data = {};
        // }
        if (typeof message === 'string' || message instanceof String) {
            CLIENTS.push({
                'id': wss.getUniqueID(),
                connection: connection
            });
        }
        console.log(CLIENTS);
        sendAll(message);
    })
    connection.on('close', function(code, reason) {
        console.log(code, "Uma");
        console.log(reason, 'mahesh');
    });
});



function sendAll(message) {
    let cl = Array.from(wss.clients);
    for (var i = 0; i < cl.length; i++) {
        cl[i].send(message);
    }
}

server.listen(1337, '192.168.3.6');
