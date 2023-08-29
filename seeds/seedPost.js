const {Post} = require('../models');
const postData = [
    {
        title: "First Blog Post",
        content: "",
        user_id: 1,
      },
      {
        title: "",
        content: "",
        user_id: 2,
      },
      {
        title: "",
        content: "",
        user_id: 3,
      },
      {
        title: "",
        content: "",
        user_id: 4,
      },
      {
        title: "",
        content: "",
        user_id: 5,
      }
];
const seedPosts = () => Post.bulkCreate(postData);
module.export = seedPosts;
