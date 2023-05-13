const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

require('dotenv').config();

const getRules = require('./rules');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const server = app.listen(3000, () => {
  console.log('Translation app listening on port 3000!');
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('translate', async ({ sourceText, targetLanguage }) => {
    if (!sourceText || !targetLanguage) {
      socket.emit('translation', { error: 'Please provide the source text and target language.' });
      return;
    }

    try {
      const messages = getRules(targetLanguage, sourceText);

      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: process.env.OPENAI_MODEL,
        messages: messages,
        max_tokens: 1023,
        n: 1,
        stop: null,
        temperature: 0.,
        top_p: 0.95
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        }
      });

      const translatedText = response.data.choices[0].message.content.trim().replace(/(^"|"$)/g, '');

      if (!translatedText) {
        socket.emit('translation', { error: 'An error occurred while translating the text.' });
      } else {
        socket.emit('translation', { translatedText });
      }
    } catch (error) {
      socket.emit('translation', { error: 'An error occurred while translating the text.' });
    }
  });
});
