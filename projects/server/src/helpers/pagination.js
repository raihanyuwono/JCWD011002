function setPagination(page = 1, limit = 10) {
  return {
    offset: (page - 1) * limit,
    limit: parseInt(limit),
  };
}

module.exports = {
  setPagination,
}