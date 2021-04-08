const { Socket } = require('net');
const readline = require('readline').createInterface({
  input: process.stdin
});

const socket = new Socket();
const END_CONNECTION = 'END_CONNECTION';

socket.connect({ host: 'localhost', port: 3000 });
socket.setEncoding('utf-8');

socket.on('connect', () => {
  readline.question('Choose your username: ', (username) => {
    socket.write(username);
  });

  readline.on('line', (line) => {
    socket.write(line);
    if (line === END_CONNECTION) {
      socket.end();
    }
  });

  socket.on('data', (message) => {
    console.log(message);
  });

  socket.on('close', () => {
    process.exit(0);
  });
});
