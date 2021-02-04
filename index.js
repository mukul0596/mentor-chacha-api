const compression = require('compression');
const helmet = require('helmet')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(compression());
app.use(helmet())

require('dotenv').config();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/mentor-chacha`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
  .then(data => console.log("Mongo Connected"))
  .catch(err => console.log(err));

mongoose.connection.on('error', err => {
  console.log("[MongoError: Occurred]", err);
});


const urls = require('./urls');
app.use(bodyParser.json());
urls(app);

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
});