const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
const path = require('path');

global.app = express();

app.use("/storages", express.static(path.join(process.cwd(), 'storages')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '500000kb'}));
app.use(bodyParser.urlencoded({limit: '500000kb', extended: true}));

var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.use(myLogger)

app.disable('x-powered-by');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept-Language, Content-Language, Accept, Cache-Control, Authorization, Access-Control-Allow-Origin");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

require('./routes/index')(app);
app.get('*', (req, res) => res.status(404).send({
    status: false,
    message: 'No api route on this value.'
}));

const port = parseInt(process.env.PORT, 10) || 8087;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;