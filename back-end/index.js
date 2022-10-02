const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv/config');
const routers = require('./routers/api');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');

const server = http.createServer(app);
const originAllow = 'https://localhost:3000';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.use(
  cors({
    origin: originAllow,
  })
);

let allowCrossDomain = function (req, res, next) {
  res.header('Cross-Origin-Resource-Policy', originAllow);
  next();
};

app.use(allowCrossDomain);

app.use(express.json());

const clientDir = path.resolve(__dirname, 'uploads');
app.use(express.static(clientDir));

//routers
app.use('/api', routers);

// DB connection
mongoose.connect('mongodb://localhost:27017/manage_task', () => {
  console.log('connected to DB !');
});

server.listen(process.env.PORT || 3001, () => {
  console.log(`🚀 Server ready `);
});
