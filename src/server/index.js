/* eslint-disable no-console */
import fs from 'fs';
import http from 'http';
import https from 'https';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import forceSSL from 'express-force-ssl';
import serialize from 'serialize-javascript';

const app = express();
app.use(cors());
app.use(compression({
  level: 9,
  strategy: 1,
  memLevel: 9,
}));
app.use(forceSSL);
app.use(express.static('dist/client'));
app.use('*', (req, res) => {
  const SESSION = {};
  res.status(200).send(`
    <!doctype html>
    <html lang="en">
      <head>
        <title>Title</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <base href="/" />
      </head>
      <body>
        <div id="root"></div>
        <script src="/main.js" defer></script>
        <script>window.__SESSION__ = ${serialize(SESSION)}</script>
      </body>
    </html>
  `);
});

const readAsUTF8 = path => fs.readFileSync(path, 'utf8');
const SSL = {
  key: readAsUTF8('./credentials/private.key'),
  cert: readAsUTF8('./credentials/certificate.crt'),
  ca: [
    readAsUTF8('./credentials/ca_bundle.crt'),
  ],
};
console.log('Starting..');
http.createServer(app).listen(
  80,
  () => console.log('Running @ port 80!'),
);
https.createServer(SSL, app).listen(
  443,
  () => console.log('Running @ port 443!'),
);
