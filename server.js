// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var async = require('async');
var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var staticServer = express();
var api = express();
var bodyParser = require('body-parser');

// req.body will be undefined w/o these
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({
    extended: true
}));

staticServer.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
staticServer.use(express.static(path.resolve(__dirname, 'client')));


var admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "scrum-70ac3",
    client_email: "foo@scrum-70ac3.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nAIzaSyCb8bO-RCQ8T6ecVXdg9hXpeqgbkNwxRm0\n-----END PRIVATE KEY-----\n"
  }),
  databaseURL: "https://scrum-70ac3.firebaseio.com"
});

admin.database().ref('nodes/').once('value', function(snap) {
  console.log(snap);
});

var url = 'mongodb://fusilli.jerry89:juno7278972789@ds019829.mlab.com:19829/feed-template';

var Node;

/*mongoose.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);

        var Schema = mongoose.Schema;

        // create a schema
        var nodeSchema = new Schema({
            _id : { type : Number, required : true, unique : true },
            priority : Number,
            title : String,
            //url : String,
            urlShortened : String,
            description : String
        });

        Node = mongoose.model('Node', nodeSchema);

        module.exports = Node;
    }
});

api.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
 });

api.get('/node', function (req, res, next) {
    console.log("GET");
    Node.find({}, function(err, nodes) {
        if (err) throw err;

        res.send(nodes);
    });
});

api.get('/node/:id', function (req, res, next) {
    console.log("GET");
    Node.findOne({ _id : req.params.id }, function(err, node) {
        if (err) throw err;

        res.send(node);
    });
});

api.post('/node', function (req, res, next) {
    console.log("POST");
    var node = {
        _id : Date.now(),
        priority : req.body['priority'],
        title : req.body['title'],
        //url : req.body['url'],
        urlShortened : req.body['urlShortened'],
        description : req.body['description']
    };

    var newNode = new Node(node);

	newNode.save(function(err, savedNode) {
        if (err) throw err;

        res.send(savedNode);
    });
});

api.post('/node/:id', function (req, res, next) {
    console.log("UPDATE");
    Node.findOne({ _id: req.params.id }, function(err, thenode) {
        if (err)
            return res.send(err);

        for (prop in req.body) {
          thenode[prop] = req.body[prop];
        }

        thenode.save(function(err) {
          if (err) {
            return res.send(err);
          }

          res.json({ message: 'Node updated!' });
        });
      });
});

api.delete('/node/:id', function (req, res, next) {
    Node.findOne({ _id: req.params['id'] }, function(err, badNode) {
        if (err) throw err;

        badNode.remove(function (err, node) {
            if (err) throw err;

            res.send('Bad node successfully thrown out!');
        });
    });
});

staticServer.listen(8080);
api.listen(8081);

console.log("Servers started.");
*/
