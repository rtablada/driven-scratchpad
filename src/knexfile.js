export default {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.USER,
      user:     process.env.USER,
      password: '',
    },
  },
};
