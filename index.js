const net = require('net');

const server = net.createServer((c) => {
  c.on('end', () => {
    console.log('client disconnected');
  });
});
server.on('connection', (connection) => {
  const proxyToServer = net.createConnection({
      host: 'localhost',
      port: '3030'
  });
  connection.pipe(proxyToServer);
  
  connection.on('data', (chunk) => {
    //proxyToServer.write(chunk);
    
   
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
