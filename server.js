var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var employees = require('./routes/employees');
var users = require('./routes/users');
var materials = require('./routes/materials');
var dealers = require('./routes/dealers');
var worktypes = require('./routes/worktypes');

var projects = require('./routes/projects');
var divisions = require('./routes/divisions');
var subdivisions = require('./routes/subdivisions');
var sections = require('./routes/sections');
var villages = require('./routes/villages');

var labours = require('./routes/labours');

var workdoneentries = require('./routes/workdoneentries');
var supervisorpayments = require('./routes/supervisorpayments');
var materialstockentries = require('./routes/materialstockentries');
var workdoneimages = require('./routes/workdoneimages');
var oldmeterimages = require('./routes/oldmeterimages');

var port = 3001;

var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

//Body Parser MW
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(function(req, res, next) {

  /*res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'x-requested-with, Content-Type, origin, authorization, accept, client-security-token'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed*/



    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true); // If needed
    next();
});

app.use('/', index);
app.use('/api', employees);
app.use('/api', users);
app.use('/api', materials);
app.use('/api', dealers);
app.use('/api', worktypes);

app.use('/api', projects);
app.use('/api', divisions);
app.use('/api', subdivisions);
app.use('/api', sections);
app.use('/api', villages);

app.use('/api', labours);

app.use('/api', workdoneentries);
app.use('/api', supervisorpayments);
app.use('/api', materialstockentries);
app.use('/api', workdoneimages);
app.use('/api', oldmeterimages);

app.listen(port, function(){

    console.log('Server Started on Port: ' + port);
});
