const net = require("net");
const { Transform } = require("stream");

class LineTransform extends Transform {
  constructor(options) {
    super(options);
    this.buffer = "";
  }

  _transform(chunk, encoding, callback) {
    this.buffer += chunk.toString();

    let messages = this.buffer.split("\n");
    this.buffer = messages.pop();

    messages.forEach((msg) => {
      msg = msg.trim();
      this.push(msg);
    });

    callback();
  }

  _flush(callback) {
    if (this.buffer) {
      this.push(this.buffer + "\n");
    }
    callback();
  }
}

const server = net.createServer((socket) => {
  console.log("Client connected");

  const transformStream = new LineTransform();
  socket.pipe(transformStream).pipe(socket);

  socket.on("end", () => console.log("Client disconnected"));
  socket.on("error", (err) => console.error("Socket error:", err.message));
});

server.on("error", (err) => {
  console.error("Server error:", err);
});

server.listen(8124, () => {
  console.log("Server is running on port 8124");
});
