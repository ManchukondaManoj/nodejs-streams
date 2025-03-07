const net = require("net");

const server = net.createServer((connection) => {
  console.log("Client connected");

  let buffer = "";

  connection.on("data", (chunk) => {
    buffer += chunk.toString();
    // Check if message is complete (ends with a newline)
    if (buffer.includes("\n")) {
      let messages = buffer.split("\n");
      buffer = messages.pop(); // Store incomplete message (if any) for later

      messages.forEach((msg) => {
        msg = msg.trim(); // Remove unnecessary spaces
        console.log("Received:", msg);
        connection.write(msg); // Echo back only the full message
      });
    }
  });

  connection.on("end", () => {
    console.log("Client disconnected");
  });

  connection.on("error", (err) => {
    console.error("Connection error:", err.message);
  });
});

server.on("error", (err) => {
  console.error("Server error:", err);
});

server.listen(8124, () => {
  console.log("Server is running on port 8124");
});
