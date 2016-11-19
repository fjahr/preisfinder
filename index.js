var express = require('express')
var http = require('http')
var querystring = require('querystring');
var app = express()
var url = "preisfinder.ebay-kleinanzeigen.de"

var options = function(query) {
  path = "/datafeed?cmd=searcheBayClassifieds&keyword=" + query

  return { host: url,
    path: path,
    port: 80,
    agent: false
  }
};
// curl "http://preisfinder.ebay-kleinanzeigen.de/datafeed?cmd=searcheBayClassifieds&keyword=iphone+4&item_display_size=8&mobile=0" --basic -u ebayk_hackathon_chatbot:cf73e71aa2721eba

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.get('/api', function(request, response) {
  query = querystring.escape(request.query.q)
  opt = options(query)

  http.get(opt, (res) => {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
  });

  response.json({message: 'Hello World!'})
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
