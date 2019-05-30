// const functions = require('firebase-functions');
//
// exports.bigben = functions.https.onRequest((req, res) => {
//
//   const SITEURL = "〇〇〇〇〇"
//   const TITLE = "〇〇〇〇〇"
//   const DESCRIPTION = "〇〇〇〇〇"
//   const IMAGE = `https://firebasestorage.googleapis.com/v0/b/oneq-7af56.appspot.com/o/test.jpg?alt=media&token=fa700ed7-6df0-4c7d-bd1a-759b0217b5ec`
//
//   res.status(200).send(`<!doctype html>
//     <head>
//       <title>Time</title>
//       <meta property="og:title" content="${TITLE}">
//       <meta property="og:image" content="${IMAGE}">
//       <meta property="og:description" content="${DESCRIPTION}">
//       <meta property="og:url" content="${SITEURL}">
//       <meta property="og:type" content="website">
//       <meta property="og:site_name" content="${TITLE}">
//       <meta name="twitter:site" content="〇〇〇〇〇〇">
//       <meta name="twitter:card" content="summary_large_image">
//       <meta name="twitter:title" content="${TITLE}">
//       <meta name="twitter:image" content="${IMAGE}">
//       <meta name="twitter:description" content="${DESCRIPTION}">
//     </head>
//     <body>
//       ${'BONG '.repeat(3)}
//     </body>
//   </html>`);
// });



const functions = require('firebase-functions');
const express = require('express');
const app = express();
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

// const url = 'https://qiita.com/';
// const site_name = 'Qiita';
// const title = 'Qiita';
// const meta_description = 'プログラミング情報共有サイトです。';
// const meta_keywords = ['プログラミング'];
// const og_description = 'プログラミング情報共有サイトです。';
const og_image_width = 1200;
const og_image_height = 630;
// const fb_appid = '';
// const tw_description = 'プログラミング情報共有サイトです。';
// const tw_site = '';
// const tw_creator = '';

const genHtml = image_url => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta property="og:locale" content="ja_JP">
    <meta property="og:title" content="oneQ - 1日1問 答えるのが病みつきになるワン！">
    <meta property="og:description" content="君も今日の質問に答えてみよう！※明日には違う質問になってるよ！">
    <meta property="og:type" content="website">
    <meta property="og:image" content="${image_url}">
    <meta property="og:image:width" content="${og_image_width}">
    <meta property="og:image:height" content="${og_image_height}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@acmikan43">
    <meta name="twitter:image" content="${image_url}">
  </head>
  <body>
    <script>
      // クローラーにはメタタグを解釈させて、人間は任意のページに飛ばす
      location.href = '/';
    </script>
  </body>
</html>
`;

app.get('/s/:id', (req, res) => {

  console.log("req->", req);
  console.log("res->", res);


  db.collection('cards')
    .doc(req.params.id)
    .get()
    .then(result => {
      if (!result.exists) {
        res.status(404).send('404 Not Exist');
      } else {
        const data = result.data()
        console.log("data---->", data);
        const dlUrl = data.storageUrl;
        const html = genHtml(dlUrl);
        res.set('cache-control', 'public, max-age=3600');
        res.send(html);
      }
    });
});
exports.s = functions.https.onRequest(app);
