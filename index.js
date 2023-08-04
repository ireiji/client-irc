const net = require('net');

const PORT = 8000;
const clients = [];

const broadcast = (message, sender) => {
  clients.forEach((client) => {
    if (client !== sender) {
      client.write(message);
    }
  });
};

const server = net.createServer((socket) => {
  clients.push(socket);

  socket.write('Welcome to the IRC chat room!\n');

  socket.on('data', (data) => {
    const message = `${socket.remoteAddress}:${socket.remotePort} - ${data}`;
    console.log(message); // Print received messages and IP address
    broadcast(message, socket);
  });

  socket.on('end', () => {
    const index = clients.indexOf(socket);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
