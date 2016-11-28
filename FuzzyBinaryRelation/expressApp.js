﻿var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

// чисто, для поддержания формальной инфраструктуры VS NodeJS проекта
app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));



http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
