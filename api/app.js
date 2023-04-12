const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const port = 3000;

app.get('/', (req, res) => {
  console.log('GET request received');
  res.send('Hello World!');
});

app.post('/send', (req, res) => {
  console.log('pushing to queue');
  let amqp = require('amqplib/callback_api');

  amqp.connect('amqp://host.docker.internal', function(error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }
      var queue = 'modeling';
      var msg = req.headers['rqa_definition'];

      channel.assertQueue(queue, {
        durable: false
      });

      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(' [x] Sent %s', msg);
    });
  });
  res.send('Message sent to queue');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
