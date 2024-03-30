const amqplib = require('amqplib/callback_api');

amqplib.connect('amqp://localhost', (err, conn) => {
  if (err) throw err;

  conn.createChannel((err, ch1) => {
    if (err) throw err;

    let queue = "Update";
    ch1.assertQueue(queue, {
      durable: false,
    });
    ch1.consume(queue, (msg)=>{
      console.log(`Received: ${msg.content.toString()}`)
      ch1.ack(msg);
    })
  });
});