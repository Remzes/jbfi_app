module.exports = [
  {
    prefix: '/api/images',
    pin: 'role:images, cmd:*',
    map: {
      avatar: {
        POST: true,
        GET: true,
      }
    }
  }
]