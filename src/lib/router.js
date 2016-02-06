import express from 'express';

export default class Router {
  constructor(express, loader, namespace) {
    this.express = express;
    this.loader = loader;
  }

  resource(uri, routeGroupName) {
    const childExpressRouter = new express.Router();
    this.express.use(uri, childExpressRouter);

    return new this(childExpressRouter, this.loader, routeGroupName);
  }

  get(uri, moduleName) {
    const Action = this.loader.require(`action:${this.getModuleName(moduleName)}`);

    console.log(Action);

    this.express.use(uri, Action.boot(this.express));
  }

  getModuleName(moduleName) {
    return moduleName;
  }
}
