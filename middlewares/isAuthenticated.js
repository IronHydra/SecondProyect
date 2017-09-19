module.exports = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  }

  res.redirect('/login');
};
