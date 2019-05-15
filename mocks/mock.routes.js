const path = require('path');
const forEach = require('lodash/forEach');
const CONFIG_POSTS = require('./mock.conf.post');
const fs = require('fs');



const MOCK_CONF_POST = Object.assign({}, CONFIG_POSTS);

const appRouter = function(app) {

  forEach(MOCK_CONF_POST, (mock, url) => {
    app.get(url, (req, res) => {
      const target = path.join(__dirname, mock);
      console.log('[mock] serving', mock);
      req.headers["X-Custom-Header"] = "yes";
      res.sendFile(target);
    });

  });
};

module.exports = appRouter;

