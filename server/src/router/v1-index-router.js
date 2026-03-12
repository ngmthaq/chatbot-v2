const { createRoutes } = require('../utils/express-utils');

module.exports = createRoutes((router) => {
  router.get('/', (req, res, _next) => {
    res.send('respond with a resource');
  });
});
