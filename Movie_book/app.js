// 모듈을 추출합니다.
var express = require('express');
var http = require('http');
var fs = require('fs');
/*
앞으로 추가할 사항
예약 취소(완료)
커플예약(완료)
*/

// 변수를 선언합니다.
var seats = [
    [1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
];

// 웹 서버를 생성합니다.
var app = express();



// 라우트를 수행합니다.
app.get('/', function (req, res) {
    res.sendfile('./index.html');
});

app.get('/seats', function (req, res, next) {
    res.send(seats);
});

// 웹 서버를 실행합니다.
var httpServer =http.createServer(app).listen(3000, function(req,res){
    console.log('Socket IO server has been started');
});

// 소켓 서버를 생성 및 실행합니다.
var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', function (socket) {
    socket.on('reserve', function (data) {
        seats[data.y][data.x] = 2;
        io.sockets.emit('reserve', data);
    });
});
io.sockets.on('connection', function (socket) {
    socket.on('coupleset', function (data) {
        seats[data.y][data.x] = 2;
        io.sockets.emit('coupleset', data);
    });
});

io.sockets.on('connection',function (socket) {
    socket.on('cancel',function (data) {
        seats[data.y][data.x] = 1;
        io.sockets.emit('cancel', data);
    });
});
io.sockets.on('connection',function (socket) {
    socket.on('cancelcouple', function (data) {
        seats[data.y][data.x] = 1;
        io.sockets.emit('cancelcouple', data);
    });
});