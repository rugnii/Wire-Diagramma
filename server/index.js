/*jshint esversion: 6 */
require("dotenv").config();
const config = require('./config')
// require("./config/database-structure")();

const asyncHandler = require('express-async-handler');
const path = require('path');
const fs = require('fs');
const bodyParser = require("body-parser");
const express = require('express');
const cors = require('cors')
const auth = require('./middleware/auth')
const morgan = require('morgan')
let app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
require('./database/db')
const mongoose = require('mongoose');
const userRouter = require('./routers/userRoutes')
const dbRouter = require('./routers/dbRoutes')
const dbServices = require('./services/dbServices')

//const db = require('monk')(process.env.MONKURL); // || 'tracker.pch.int:27017/tube-os');


const fileUpload = require('express-fileupload');
var DOMParser = require('xmldom').DOMParser; 
var request = require("request");

const MongoObjectID = require('mongodb').ObjectID;
//const uniqid = require('uniqid');


const frontend = io.of('/frontend');
frontend.on('connection', s => {
  console.log('socket.io frontend connection');
});

//|****************************************************************************| 
//|============================== MONGOOSE: SETUP =============================|
//|****************************************************************************|  
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
    autoIndex: true
    });
  } catch (err) {
    console.log("Database +*+*+* Error")
    console.error(err)
  }
}
connect()
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to database: '+ process.env.MONGOOSE_URL)
});
let models = require('./models/publicModels.js')
let userModels = require('./models/userModels')

const initializeUserRoles = async () => {
  for (let roleName of config.userRoles) {
    let query = {name: roleName},
     newEntry = {name: roleName},
     options = {upsert: true}
    try {
      const response = await userModels.roles.findOneAndUpdate(query, newEntry, options)
      //await role.save()
      console.log(response)
    } catch (err) {
      console.error(err);
    }
  }
};

const getUsers = async () => {
  const response = await userModels.users.find({})
  console.log(response)
}
 //initializeUserRoles();

const addShoeModel = async (shoe) => {
  let newShoe = new models.shoeModels(shoe);
  try {
    let response = await newShoe.save()
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}
//|****************************************************************************| 
//|============================== EXPRESSS: SETUP =============================|
//|****************************************************************************|  

app.set('port', process.env.PORT || 3000);

// app.use(morgan('combined'))
//app.use(express.static(path.join(__dirname, 'views')));
//app.use(express.static('public'));
//app.set('view engine', 'html');
app.use('/img', express.static(__dirname + '/static/images'))
app.use('/vid', express.static(__dirname + '/static/videos'))
app.use('/static', [auth, express.static(__dirname + '/static')])
app.use(express.static(process.env.BASE_PATH + 'frontend/nike-db-browser/dist/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));
app.use(cors());
app.use(userRouter);
app.use(dbRouter);


server.listen(process.env.PORT, () => console.log('listening on http://localhost:' + process.env.PORT+'/'));


//|******************************************************************************| 
//|============================== EXPRESSS: APP GET =============================|
//|******************************************************************************| 

app.get('/views/:name', asyncHandler(async (req, res, next) => {
  let fileName = req.params.name;
  res.sendFile(fileName, { root: __dirname });
}));

// ------------------ INDEX --------------
app.get('/', asyncHandler(async (req, res, next) => {
  res.render('pages/index',{"frontendURL": process.env.FRONTENDURL});
}));


//|********************************************************************************************| 
//|============================== EXPRESSS: APP POST FRONTEND APP =============================|
//|********************************************************************************************|  

