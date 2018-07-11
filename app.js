// Dependences
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// Bypass Access-Control-Allow-Origin Problem
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // "*" for public access and www.example.com for specific uses
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

// Get function
app.get('/api/whoami', function(req, res, next){
	const ip = req.ip;
	const language = req.acceptsLanguages();
	const user_agent = req.get('User-Agent');
	const getIP = (str) => {
		let temp = str.split(':');
		return temp[3];
	}
	res.json({
		"IP Address": getIP(ip),
		"Language": language[0],
		"Software": user_agent
	});
})

// Set port
const port = process.env.PORT || 3000;

// Listing app
app.listen(port, function() {
	console.log(`App is listing on PORT ${port}`);
})

// Export app as module
module.exports = app;