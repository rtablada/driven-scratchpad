export default class Action {
  beforeHooks = [];

  afterHooks = [
    function(data) {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve({data}), 500);
      });
    },
  ];

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
    return this.data();
  }

  createMiddleware() {
    return (req, res) => {
      this.request = req;

      const finalResult = [this.handle, ...this.afterHooks].reduce((carry, curr) => {
        return carry.then((result) => this::curr(result));
      }, Promise.resolve());

      finalResult.then((d) => {
        res.send(d);
      });
    };
  }

  static boot(app) {
    const instance = new this(app);

    return instance.createMiddleware();
  }
}
