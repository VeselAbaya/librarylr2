const { library } = require('../../libraryDB');

class LibraryController {
  getBooks(req, res) {
    const query = req.query;
    const filteredLibrary = library.filter(book => {
      if (query.inStock != null && book.details.inStock.toString() !== query.inStock) {
        return false;
      }

      if (query.expired != null) {
        if (query.expired === 'true') {
          return Date.parse(book.details.expiredDate) < Date.now();
        }
        else {
          return Date.parse(book.details.expiredDate) > Date.now() || book.details.inStock;
        }
      }

      return true;
    });

    const filterTypes = [];
    for (let queryName in query) if (query.hasOwnProperty(queryName)) {
      filterTypes.push(query[queryName] === 'false' ? `not-${queryName}` : queryName);
    }

    if (req.isAuthenticated()) {
      res.render('library-authenticated', {library: filteredLibrary, filterTypes});
    }
    else {
      res.render('library-not-authenticated', {library: filteredLibrary, filterTypes});
    }
  }
}

module.exports = new LibraryController();
