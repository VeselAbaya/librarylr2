module.exports = function(app) {
  const passport = require('passport');
  const session = require('express-session');
  app.use(session({secret: 'My really genius and absolutely secure secret'}));
  app.use(passport.initialize());
  app.use(passport.session());

  const LocalStrategy = require('passport-local').Strategy;
  const { users } = require('../../libraryDB');
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, function(email, password, done) {
    const user = users.find(user => user.email === email);
    if (!user || user.password !== password) {
      return done(null, false);
    }

    done(null, user);
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.email);
  });

  passport.deserializeUser(function(email, done) {
    const user = users.find(user => user.email === email);
    if (!user) {
      return done(`There is no user with email:${email}`, null);
    }

    done(null, user);
  });
};
