const { library } = require('../../libraryDB');
const { nextMonth } = require('../../util');
const { merge } = require('lodash');

class BookController {
  take(req, res) {
    console.log(req.book);

    const book = req.book;
    if (!book.details.inStock) {
      return res.status(422).send({
        status: 'error',
        message: `Can't take book with id ${book.id} because it's already taken`
      })
    }

    book.details.inStock = false;
    book.details.expiredDate = req.body.expiredDate || nextMonth().toISOString().slice(0, 10);
    book.details.takenBy = req.user.email;

    res.render('book-card', {book, user: req.user});
  }

  handOver(req, res) {
    const book = req.book;
    book.details.inStock = true;
    book.details.expiredDate = null;
    book.details.takenBy = null;

    res.send({
      status: 'success',
      data: book
    });
  }

  getBook(req, res) {
    res.render('book-card', {book: req.book, user: req.user});
  }

  deleteBook(req, res) {
    const bookIndex = library.findIndex(book => book.id === req.book.id);
    library.splice(bookIndex, bookIndex + 1);
    res.redirect('/');
  }

  changeBook(req, res) {
    const book = req.book;
    merge(book, req.body);
    res.render('book-card', {book: book, user: req.user});
  }

  find(req, res, next, id) {
    const book = library.find(book => book.id === id);
    if (book) {
      req.book = book;
      return next();
    }

    return res.status(404).send({
      status: 'error',
      message: `Can't find book with id ${id}`
    });
  }

  createBook(req, res) {
    console.log(req.body);
    if (!req.body.name || !req.body.author) {
      return res.status(400).send({
        status: 'error',
        message: 'Incorrect payload'
      })
    }

    const newBook = {
      ...req.body,
      details: {
        inStock: true,
        expiredDate: null,
        takenBy: null
      }
    };

    library.push(newBook);

    res.redirect('/');
  }
}

module.exports = new BookController();
