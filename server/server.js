const WebSocket = require("ws");

const port = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port });

let messageList = [];

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);

    let parsedMessage = JSON.parse(message);
    parsedMessage.date = +new Date();

    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(parsedMessage));
    });
  });

  let initialMessage = {
    username: "the machine",
    value: "sparta!!!!!!!!!!!!!",
    date: +new Date(),
  };

  ws.send(JSON.stringify(initialMessage));

  console.log(`
    new connection!!
    the number of connections now is ${wss.clients}
  `);
});

console.log(`✨ web socket server running on port ${port}`);
