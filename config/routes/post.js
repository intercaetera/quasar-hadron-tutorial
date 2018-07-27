const jwt = require('jsonwebtoken');

module.exports = {
  createPost: {
    path: '/post/create',
    methods: ['POST'],
    callback: async (req, { userRepository, postRepository }) => {
      // Retrieve JWT from headers
      const { authorization } = req.headers;

      let id;
      try {
        // Split off the 'Bearer' part of the token and verify.
        id = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET);
      } catch (e) {
        return { status: 401, body: { error: 'Error decoding token (unauthorized).' } };
      }

      // Retrieve relevant parts of the post from the request.
      const { title, content } = req.body;
      const date = new Date();

      const user = await userRepository.findOne({ id });

      if (!user) {
        return { status: 404 };
      }

      // Save the post.
      const post = await postRepository.save({
        title, content, date, user,
      });

      // Return the saved post back to the user.
      return { status: 201, body: post };
    },
  },
  getAllPosts: {
    path: '/post/get',
    methods: ['GET'],
    callback: async (req, { postRepository }) => {
      // We want newest posts first.
      const posts = await postRepository.find({ relations: ['user'], order: { date: 'DESC' } });

      // Delete password hashes from the posts.
      const filtered = posts.map(post => {
        delete post.user.hashedPassword;
        return post;
      });

      return { status: 200, body: filtered };
    },
  },
};
