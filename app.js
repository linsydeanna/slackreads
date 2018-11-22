const fetch = require('node-fetch');
const TOKEN = require('./config.js');
const bookExcerpts = require('./book-excerpts');
const cron = require('node-cron');

const sendExcerptToSlack = excerptToPost => fetch('https://slack.com/api/chat.postMessage', {
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

let posts = [];

cron.schedule('* * * * * *', () => {

  // fetch posts from database

  const bookFinished = posts.length === bookExcerpts.length;

  if (!bookFinished) {
    console.log('posts starting value ', posts);

    const excerpt = bookExcerpts[posts.length].text
    sendExcerptToSlack(excerpt)

    let newPosts = [...posts, 'chapter ' + (posts.length + 1)]
    console.log('newPosts ', newPosts);

    posts = newPosts // update posts in database

    console.log('--------------- \n')
  } else {
    process.exit();
  }
});
