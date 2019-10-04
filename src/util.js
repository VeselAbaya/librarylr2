exports.nextMonth = function() {
  const now = new Date();
  if (now.getMonth() === 11) {
    return new Date(now.getFullYear() + 1, 0, now.getDate());
  }
  else {
    return new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
  }
};
