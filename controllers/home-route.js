const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const useAauth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User]
            });
        const posts = postData.map((post) => post.get({ plain: true }));
            res.render('homepage', {
                posts,
                logged_in: req.session.logged_in
            });
            } catch (err) {
            res.status(500).json(err);
            }
});
router.get('/post/:id', useAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User
                },
                {
                    model: Comment,
                    include: [User]
                }
            ]
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        const post = postData.get({ plain: true });

        res.render('single-post', {
            post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
// route to homepage with all posts with user and followers
router.get('/home', useAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id },
            include: [User] });
            const posts = postData.map((post) => post.get({ plain: true }));
            res.render('home', { posts, logged_in: req.session.logged_in });
        } catch (err) {
            res.status(500).json(err);
        }
    });
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/home');
        return;
        }
        res.render('login');
        });
router.get('signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/home');
        return;
        }
        res.render('signup');
        });
router.get('/newPost', (req, res) => {
    if (req.session.logged_in) {
        res.render('newpost');
        return;
    }
    else {
        res.redirect('/login');
    }
});
// edit post
router.get("/editpost/:id", async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          { model: User, attributes: ["username"] },
          {
            model: Comment,
            include: [{ model: User, attributes: ["username"] }],
          },
        ],
      });
const { post } = postData.get({ plain: true });
res.render("editpost", {
    post,
    logged_in: req.session.logged_in,
    });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;



