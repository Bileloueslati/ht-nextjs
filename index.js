const express = require("express");

const next = require("next");

const compression = require("compression");

const port = parseInt(process.env.PORT, 10) || 3000;

const app = next({ dev: false });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(compression());

  server.all("*", (req, res) => {
    handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server ready on ${port}`);
  });
});
