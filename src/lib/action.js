export default class Action {
  /**
   * Express Request Object
   */
  request;

  constructor(app) {
    this.app = app;
  }

  /**
   * Simplified promise aware hook for finding data
   * @return {any} POJO or Promise of data
   */
  data() {
  }

  /**
   * User defined action handler
   * Promise aware
   */
  handle() {
    return {data: this.data()};
  }

  createMiddleware() {
    return (req, res) => {
      this.request = req;

      Promise.resolve(this.handle()).then((result) => {
        res.send(result);
      });
    };
  }

  static boot(app) {
    const instance = new this(app);

    return instance.createMiddleware();
  }
}
