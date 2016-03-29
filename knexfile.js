// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.USER,
      user:     process.env.USER,
      password: ''
    },
  },
};
