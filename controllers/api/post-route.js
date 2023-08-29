const router = require('express').Router();
const{Post, User, Comment} = require('../../models');
const useAuth = require('../utils/auth');
// get all posts
router.get('/', async (req, res) => {
    try {
    const postData = await Post.findAll({
        include: [
            {model: User},
            {model: Comment, include: [User]}
        ]
    });

    const posts = postData.map((post) =>
        post.get({plain: true})
    );

    res.json(posts);
} catch (err) {
    res.status(500).json(err);
}
});
// get single post by id
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User
                },
                {
                    model: Comment,
                    include: {
                        model: User
                    }
                }
            ]
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
})
    // create a post
    router.post('/', useAuth, async (req, res) => {
        try {
            const postData = await Post.create({
                // destructure req.body
                ...req.body,
                user_id: req.session.user_id
            });
            res.json(postData);
        } catch (err) {
            res.status(400).json(err);
        }
    });

    // update post by id
    router.put('/:id', useAuth, async (req, res) => {
        try {
            const postData = await Post.update(req.body, {
                where: {
                id: req.params.id
                }
            });
        } catch (err) {
            res.status(500).json(err);}
        });
    // delete post by id
    router.delete('/:id', useAuth, async (req, res) => {
        try {
            const postData = await Post.destroy({
                where: {
                id: req.params.id
            }
            });
        } catch (err) {
            res.status(500).json(err);
        }
        });
module.exports = router;
