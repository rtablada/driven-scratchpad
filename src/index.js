/* @flow */

import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import morgan from 'morgan';

const app = express();
const upload = multer();

app.use(express.static(__dirname + '/../public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import Loader from './lib/loader';
import Router from './lib/router';

const router = new Router(app, new Loader(__dirname));

router.get('/courses', 'courses/index');

app.get('/hello', (req, res) => {
  res.send('Hello Earth!');
});

const server = app.listen(3000, function () {
  console.log('Express listening on port 3000');
});
