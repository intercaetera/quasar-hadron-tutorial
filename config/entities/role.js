module.exports = {
  name: 'role',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: { type: 'varchar' },
  },
};
