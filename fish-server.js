// HTTP Portion
var http = require('http');
// Path module
var path = require('path');
// filesystem module for local storage on server
var fs = require('fs');

require('dotenv').config();

// twilio setup for messaging and calling
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;

const client = require('twilio')(accountSid, authToken);

// console.log("-= sending test message to phone =-")
// client.messages
//   .create({
//     body: 'Hello from twilio-node',
//     to: '+12029973952', // Text your number
//     from: `${twilioPhone}`, // From a valid Twilio number
//   })
//   .then((message) => console.log(`sent message (${message.sid}) ${message}`));

client.calls
  .create({
      url: 'http://demo.twilio.com/docs/voice.xml',
      to: '+12029973952',
      from: `${twilioPhone}`
    })
  .then(call => console.log(call.sid));

var server = http.createServer(handleRequest);
// server.listen(8080);
// console.log('--== Server started on port 8080 ==--');
server.listen(80);
console.log('--== Server started on port 80 ==--');

const io = require('socket.io')(server)
console.log('--== socket.io listening on server ==--');

let phoneUsers = {};

function handleRequest(req, res) {
  // What did we request?
  var pathname = req.url;
  
  // If blank let's ask for index.html
  if (pathname == '/') {
    pathname = '/index.html';
  } else if (pathname == '/reset') {
    pathname = '/reset.html';
  }
  
  // Ok what's our file extension
  var ext = path.extname(pathname);

  // Map extension to file type
  var typeExt = {
    '.html': 'text/html',
    '.js':   'text/javascript',
    '.css':  'text/css',
    '.gif':  'image/gif' 
  };
  // What is it?  Default to plain text

  var contentType = typeExt[ext] || 'text/plain';

  // User file system module
  fs.readFile(__dirname + pathname,
    // Callback function for reading
    function (err, data) {
      // if there is an error
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' + pathname);
      }
      // Otherwise, send the data, the contents of the file
      res.writeHead(200,{ 'Content-Type': contentType });
      res.end(data);
    }
  );
}

// ======== SOCKET STUFF =========

io.sockets.on('connection', (socket) => {

    console.log("We have a new client: " + socket.id);

    socket.on('disconnect', () => console.log("Client has disconnected"));

    socket.on('phone',(data) => {
      // Data comes in as whatever was sent, including objects
      const thisUser = {
        uid: data["uid"],
        phoneNum: data["phoneNum"],
        startTime: Date.now()
      }
      console.log(`received phone ${thisUser.phoneNum} (uid:${thisUser.uid}) @ ${thisUser.startTime} `);
      
      // await new Promise(r => setTimeout(r, 2000));

      console.log((Date.now() - thisUser.startTime) + " ms ago");
    });
  }
);