const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

const rootDir = require('./util/path');
// const expressHbs = require('express-handlebars');
const User = require('./models/user')

// const mongoConnect = require('./util/database').mongoConnect;
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
// app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next) => {
    
})

app.use((req, res, next) => {
    User.findById('5c3cb2228d56ac3e28fab45c')
        .then(user => {
            req.user = user;
            next()
        })
        .catch(err => console.log(err))
})

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://Hrayr:1gohardlikePutin!@cluster0-ntrwp.mongodb.net/shop?retryWrites=true'
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Hrayr',
          email: 'test@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);

  })
  .catch(err => {
    console.log(err);
  });