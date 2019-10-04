const passport = require('passport');
const userController = require('./user.controller');
const userRouter = require('express').Router();

userRouter
  .post('/signin', passport.authenticate('local'), userController.signIn)
  .post('/signup', userController.signUp)
  .get('/logout', require('../authentication/isAuthenticated.middleware'), userController.logout)
  .get('/:email/books', userController.getUserBooks);

module.exports = userRouter;
