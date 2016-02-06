import express from 'express';

export default class Router {
  constructor(express, loader, namespace) {
    this.express = express;
    this.loader = loader;
    this.namespace = namespace;
  }

  resource(uri, routeGroupName, cb) {
    const childExpressRouter = new express.Router();
    this.express.use(uri, childExpressRouter);

    const childRouter = new Router(childExpressRouter, this.loader, routeGroupName);

    cb(childRouter);
  }

  get(uri, moduleName) {
    const namespace = this.namespace ? `${this.namespace}/` : '';

    const Action = this.loader.require(`action:${namespace}${this.getModuleName(moduleName)}`);

    console.log(Action);

    this.express.use(uri, Action.boot(this.express));
  }

  getModuleName(moduleName) {
    return moduleName;
  }
}
