const bookController = require('./book.controller');
const bookRouter = require('express').Router();

const isAuthenticated = require('../authentication/isAuthenticated.middleware');

bookRouter.use(isAuthenticated);
bookRouter.param('id', bookController.find);

bookRouter
  .post('/create', bookController.createBook)
  .get('/:id', bookController.getBook)
  .post('/:id', bookController.changeBook)
  .patch('/take/:id', (req, res, next) => {console.log(req.url); next()},bookController.take)
  .patch('/handover/:id', bookController.handOver)
  .delete('/delete/:id', bookController.deleteBook); // 'get' to delete it by href on client

module.exports = bookRouter;
