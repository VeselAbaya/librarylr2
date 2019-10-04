const { users, library } = require('../../libraryDB');

class UserController {
  signUp(req, res) {
    if (users.find(user => user.email === req.body.email)) {
      return res.status(422).send({
        status: 'error',
        message: `User with email ${req.body.email} is already created`
      });
    }

    const newUser = {
      email: req.body.email,
      password: req.body.password
    };
    users.push(newUser);

    res.redirect('/');
  }

  signIn(req, res) {
    if (!req.user) {
      return res.status(403).send({
        status: 'error',
        message: 'Incorrect user credentials'
      })
    }

    res.redirect('/');
  }

  logout(req, res) {
    req.logout();
    res.redirect('/');
  }

  getUserBooks(req, res) {
    if (!users.map(user => user.email).includes(req.params.email)) {
      return res.status(422).send({
        status: 'error',
        message: `There is no user with email ${req.params.email}`
      })
    }

    res.send({
      status: 'success',
      data: library.filter(book => book.details.takenBy === req.params.email)
    });
  }
}

module.exports = new UserController();
