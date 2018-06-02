/* eslint-disable no-console */
import fs from 'fs';
import http from 'http';
import https from 'https';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import forceSSL from 'express-force-ssl';

const app = express();
app.use(cors());
app.use(compression({
  level: 9,
  strategy: 1,
  memLevel: 9,
}));
app.use(forceSSL);
app.use('*', (req, res) => {
  res.status(200).json({ message: 'Hello world!' });
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
