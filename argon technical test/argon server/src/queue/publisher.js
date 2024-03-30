const amqplib = require('amqplib/callback_api');

function sendMessage (message) {
  amqplib.connect('amqp://localhost', (err, conn) => {
    if (err) throw err;
  
    // Sender
    conn.createChannel((err, ch1) => {
      if (err) throw err;
  
      let queue = "Update";
      ch1.assertQueue(queue, {
        durable: false,
      });
  
      ch1.sendToQueue(queue, Buffer.from(message));
      console.log(`Message : ${message}`)
      setTimeout(() => {
        conn.close();
      }, 1000);
    });
  });
}

module.exports = {
  sendMessage
}