const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production'
process.env.NODE_OPTIONS="--max-old-space-size=8192"

const app = next({ dev })
const handle = app.getRequestHandler()

console.log("NODE_ENV=", process.env.NODE_ENV);
// disabling console.log
console.log = function(){};

app.prepare()
.then(() => {
  const server = express();

   server.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
  });

  server.get('/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { title: req.params.id, pathname: req.pathname }
    app.render(req, res, actualPage, queryParams)
  })

  const options = {
    root: __dirname + '/public/static/',
    headers: {
            'Content-Type': 'text/plain;charset=UTF-8',
    }
  };
   
  server.get('/robots.txt', (req, res) => (
      res.status(200).sendFile('robots.txt', options)
  ));

  server.get('/sitemap.xml', (req, res) => (
    res.status(200).sendFile('sitemap.xml', options)
  ));

  server.get('/dnswl.txt', (req, res) => (
    res.status(200).sendFile('dnswl.txt', options)
  ));

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  var port = 8080;
// do all the routing and etc
var listener = server.listen(port, '127.0.0.1', function() {
    console.log("Listening on port " + listener.address().port);
});

})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})