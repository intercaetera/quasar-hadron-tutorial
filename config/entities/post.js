module.exports = {
  name: 'post',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    title: { type: 'varchar' },
    content: { type: 'text' },
    date: { type: 'timestamp' },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'user',
      joinColumn: true,
    },
  },
};
