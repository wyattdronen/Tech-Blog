const router = require("express").Router();
const { Comment } = require("../../models");
const useAuth = require("../../utils/auth");

router.post("/", useAuth, async (req, res) => {
  try {    

    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    })
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});
// Export the router
module.exports = router;

