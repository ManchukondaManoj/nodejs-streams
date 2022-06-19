const net = require('net');

const server = net.createServer((c) => {
  c.on('end', () => {
    console.log('client disconnected');
  });
});
server.on('connection', (connection) => {
  connection.on('data', (chunk) => {
    const proxyToServer = net.createConnection({
      host: 'localhost',
      port: '3030'
    });

    proxyToServer.write(chunk);
    
    connection.pipe(proxyToServer);
    proxyToServer.pipe(connection);

    connection.on('error', (err) => {
      console.log('===err', err);
    })
})
})
server.on('error', (err) => {
  throw err;
});
server.listen(8124, () => {
  console.log('server bound');
});