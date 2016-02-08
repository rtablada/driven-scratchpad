import express from 'express';

export default class Router {
  constructor(express, container, namespace) {
    this.express = express;
    this.container = container;
    this.loader = container.loader;
    this.namespace = namespace;
  }

  resource(uri, routeGroupName, cb) {
    const childExpressRouter = new express.Router();
    this.express.use(uri, childExpressRouter);

    const childRouter = new Router(childExpressRouter, this.container, routeGroupName);

    cb(childRouter);
  }

  get(uri, moduleName) {
    const namespace = this.namespace ? `${this.namespace}/` : '';

    const Action = this.container.loader.require(`action:${namespace}${this.getModuleName(moduleName)}`);

    this.express.use(uri, Action.boot(this.container));
  }

  getModuleName(moduleName) {
    return moduleName;
  }
}
