var express =  require("express");
var fs = require('fs');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.all('/*', function(req, res, next) {
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Credentials", "true");
res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    if ('OPTIONS' === req.method) {
        next();
        return;
    }
    else
        next();
});





function call(req,res) {
    var zpl = "^xa^cfa,50^fo100,100^fdHello World^fs^xz";

    var options = {
        encoding: null,
        formData: { file: zpl },
        // headers: { 'Accept': 'application/pdf' }, // omit this line to get PNG images back
        url: 'http://api.labelary.com/v1/printers/8dpmm/labels/4x6/0/' // adjust print density (8dpmm), label width (4 inches), label height (6 inches), and label index (0) as necessary
    };
    request.post(options, function(err, resp, body) {
        if (err) {
            return console.log(err);
        }
        res.json(body);
    });
}

function callGenerateLabel(req,res) {
    // console.log(req,res);
    // console.log(req.body)
    // console.log(req.body.zpl);
    var options = {
        encoding: null,
        formData: { file: req.body.zpl },
        // headers: { 'Accept': 'application/pdf' }, // omit this line to get PNG images back
        url: `http://api.labelary.com/v1/printers/${req.body.density}dpmm/labels/${req.body.width}x${req.body.height}/0/` // adjust print density (8dpmm), label width (4 inches), label height (6 inches), and label index (0) as necessary
    };
    request.post(options, function(err, resp, body) {
        if (err) {
            return console.log(err);
        }
        res.json(body);
    });
}


app.get("/getlabel",function(req,res){
    call(req,res);
});

app.post("/generateLabel", function(req,res) {
    callGenerateLabel(req,res);
});
console.log(`Running on localhost: 3000`)
app.listen(3000);