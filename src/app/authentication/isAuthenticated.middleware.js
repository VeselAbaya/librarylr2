module.exports = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(403).send({
    status: 'error',
    message: 'You can\'t get access to this route'
  })
};
