const express = require('express');
const app = express();

const WebSocket = require('ws');
const socket = new WebSocket.Server({port: 80});


app.use("/", function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(80);

socket.on('connection', (ws, req) => {
  

  // 에러 발생 시
  ws.on('error', (err) => {
    console.error(err);
  });

  // 연결 종료 시
  ws.on('close', () => { 
    console.log('클라이언트 접속 해제'/* , ip */);
    clearInterval(ws.interval);
  });


  ws.on('message', (message) => { // 클라이언트로부터 메시지 수신 시
    console.log(message);
  });
  
  // send
  ws.interval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send('서버:');
      // 공백
    }
  }, 3000);

});

