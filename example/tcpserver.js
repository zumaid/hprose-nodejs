/*jshint node:true, eqeqeq:true */
'use strict';

var hprose = require('hprose');

function hello(name) {
    return 'Hello ' + name + '!';
}

function hello2(name) {
    return 'Hello ' + name + '!';
}

function asyncHello(name, callback) {
    callback('Hello ' + name + '!');
}

function getMaps() {
    var result = {};
    var key;
    for (key in arguments) {
        result[key] = arguments[key];
    }
    return result;
}

function HproseFilter() {
    this.inputFilter = function(value) { console.log(value.toString()); return value; };
    this.outputFilter = function(value) { console.log(value.toString()); return value; };
}

var server = new hprose.server.TcpServer();
server.setFilter(new HproseFilter());
//server.setSimpleMode(true);
server.addFunctions([hello, hello2, getMaps]);
server.addAsyncFunction(asyncHello);
server.on('sendError', function(message) {
    console.log(message);
});
server.listen(4321);