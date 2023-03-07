const express = require("express");

const next = require("next");

const compression = require("compression");

const { parse } = require("url");

const port = parseInt(process.env.PORT, 10) || 3000;

const app = next({ dev: false });

const handle = app.getRequestHandler();

const server = express();

app.prepare().then(() => {
  server.use(compression());

  server.all("*", (req, res) => {
    const { url } = req;

    const parsedUrl = parse(url, true);

    handle(req, res, parsedUrl);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server ready on ${port}`);
  });
});
