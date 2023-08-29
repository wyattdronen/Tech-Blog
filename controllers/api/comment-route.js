const router = require('express').Router();
const { Comment } = require('../../models');
const useAuth = require('../utils/auth');
// new account
router.post('/', useAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});
// get all comments
router.get('/', async (req, res) => {
    try {
    const commentData = await Comment.findAll({
        include: [
            {model: User},
            {model: Post}
        ]
    });

    res.json(commentData);
} catch (err) {
    res.status(500).json(err);
    }
});
module.exports = router;
