/* @flow */

import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import morgan from 'morgan';
import knex from 'knex';
import knexConfig from './knexfile';

const db = knex(knexConfig.development);

const app = express();
const upload = multer();

app.use(express.static(__dirname + '/../public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import Loader from './lib/loader';
import Router from './lib/router';
const loader = new Loader(__dirname);
const container = {
  loader,
  db,
};

const router = new Router(app, container);

router.resource('/courses', 'courses', (router) => {
  router.get('/', 'index');
});

router.resource('/users', 'users', (router) => {
  router.get('/', 'index');
});

const server = app.listen(3000, function () {
  console.log('Express listening on port 3000');
});
