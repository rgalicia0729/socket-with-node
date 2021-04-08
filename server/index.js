const { Server } = require('net');

const server = new Server();

const PORT = 3000;
const END_CONNECTION = 'END_CONNECTION';

const connections = new Map();

/** Enviar a todos menos a origen */
const sendMessage = (message, origin) => {

}

server.on('connection', (socket) => {
  const remoteSocket = `${socket.remoteAddress}:${socket.remotePort}`;
  console.log(`New connection on: ${remoteSocket}`);
  socket.setEncoding('utf-8');

  socket.on('data', (message) => {
    if (!connections.has(socket)) {
      console.log(`Username ${message} set for connection ${remoteSocket}`);
      connections.set(socket, message);
    } else if (message === END_CONNECTION) {
      socket.end();
    } else {
      // Enviar mensajes al resto del cliente
      socket.write(message);
    }
  });

  socket.on('close', () => {
    console.log(`Connection with ${remoteSocket} closed`);
  });
});

server.listen({ port: PORT, host: '0.0.0.0' }, () => {
  console.log(`Listening on port: ${PORT}`);
});
