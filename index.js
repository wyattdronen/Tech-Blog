const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv').config()
const exphbs = require('express-handlebars');
// this is for session managment with cookies
const session = require('express-session');
const routes = require('./controllers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

const sess = {
  secret: 'password',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};
app.use(session(sess));
app.engine('handlebars', hbs.engine);
// sets engine
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Use static middleware for serving static assets (images, css, js, etc) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});