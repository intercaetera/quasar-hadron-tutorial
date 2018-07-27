module.exports = {
  name: 'user',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: { type: 'varchar' },
    hashedPassword: { type: 'varchar' },
  },
  relations: {
    roles: {
      type: 'many-to-many',
      target: 'role',
      joinTable: {
        name: 'user_role',
      },
    },
    posts: {
      type: 'one-to-many',
      target: 'post',
      inverseSide: 'user',
    },
  },
};
