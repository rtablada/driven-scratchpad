export default class CourseIndex {
  constructor(app) {
    this.app = app;
  }

  createMiddleware() {
    return (req, res) => {
      res.send({
        data: [
          {
            type: 'courses',
            id: 1,
            attributes: {
              name: 'Learn Ember',
            },
          },
        ],
      });
    };
  }

  static boot(app) {
    const instance = new CourseIndex(app);

    return instance.createMiddleware();
  }
}
