// Basic CRUD operations for the user entity.
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  createUser: {
    path: '/user/create',
    methods: ['POST'],
    callback: async (req, { userRepository, roleRepository }) => {
      const { name, password } = req.body;

      // Check if a user with the same name already exists.
      const userExists = await userRepository.findOne({ name });
      if (userExists) {
        return { status: 409, body: { error: 'User with this name already exists.' } };
      }

      // Hash his password with bcrypt.
      const hashedPassword = await bcrypt.hash(password, 10);

      // Find the role to assign him.
      const userRole = await roleRepository.findOne({ name: 'User' });

      // Save the user.
      const user = await userRepository.save({
        name, hashedPassword,
        roles: [userRole],
      });

      // There's no real reason to show him his hashed password...
      delete user.hashedPassword;

      // ...but we will give him his token.
      // Remember to use environment variables to protect sensitive information.
      user.token = jwt.sign(user.id, process.env.JWT_SECRET);

      return { status: 201, body: user };
    },
  },
  loginUser: {
    path: '/user/login',
    methods: ['POST'],
    callback: async (req, { userRepository }) => {
      const { name, password } = req.body;

      const user = await userRepository.findOne({ where: { name }, relations: ['roles'] });
      if (!user) {
        return { status: 401, body: { error: 'User with this name doesn\'t exist.' } };
      }

      const match = await bcrypt.compare(password, user.hashedPassword);
      if (!match) {
        return { status: 401, body: { error: 'Credentials invalid.' } };
      }

      delete user.hashedPassword;
      user.token = jwt.sign(user.id, process.env.JWT_SECRET);
      return { status: 200, body: user };
    },
  },
  authorizeUser: {
    path: '/user/authorize',
    methods: ['GET'],
    callback: async (req, { userRepository }) => {
      // Grab the authorization header from the request.
      const { authorization } = req.headers;

      // Unpack the token to get the id.
      let id;
      try {
        // We split off the 'Bearer' part of the token
        id = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET);
      } catch (e) {
        return { status: 401, body: { error: 'Authorization unsuccessful.' } };
      }

      // If our token passes the check we retrieve a user
      const user = await userRepository.findOne({
        where: { id },
        relations: ['roles'],
      });

      // If the token is for a user that doesn't exist we
      // return an error.
      if (!user) {
        return { status: 404, body: { error: 'User not found.' } };
      }

      // Remove the password hash from the response and
      // generate a new token in case the first one expires
      // while we're processing it.
      delete user.hashedPassword;
      user.token = jwt.sign(user.id, process.env.JWT_SECRET);

      // If everything goes well, return the user.
      return { status: 200, body: user };
    },
  },
};
