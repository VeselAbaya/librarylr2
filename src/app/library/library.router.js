const libraryController = require('./library.controller');
const libraryRouter = require('express').Router();

libraryRouter
  .get('/', libraryController.getBooks);

module.exports = libraryRouter;
