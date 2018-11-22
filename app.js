const fetch = require('node-fetch');
const TOKEN = require('./config.js');
const book = require('./book');

const postToSlack = () => {

  const excerptToPost = book[0].text

  fetch('https://slack.com/api/chat.postMessage', {
    method: 'post',
    body: JSON.stringify({
      channel: '#the-war-of-art',
      text: excerptToPost
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}`
    },
  })
    .then(res => res.json())
    .then(res => console.log('res ', res))
    .catch(error => console.log('error ', error))

}

postToSlack();
