var http = require('http');
var url = require('url');
http.createServer(function onCliReq(cliReq, cliRes) {
  var x = url.parse(cliReq.url);
  var ts = parseInt((new Date).getTime()/1000);
  var path;
  switch (x.path.substring(0, 2)) {
    case '/t':
      path = "/get/top_val.cgi?poll=" + ts;
      break;
    case '/p': // "/p0" .. "/p3"
      index = x.path.substring(2, 3);
      path = "/get/instantvaldata.cgi?pageno=" + index + "&poll=" + ts;
      break;
    case '/l':
      path = "/set/exectop2.cgi";
      break;
    default:
      cliRes.writeHead(404, {'Content-Type': 'text/html'});
      cliRes.write("<html><title>404 Not Found</title><body>404 Not Found</body></html>");
      cliRes.end();
      return;
  }
  var req = http.get(
    {
      host: 'AISEG_HOST',
      port: 80,
      path: path,
      auth: 'AiSEG:AISEG_PASS'
    },
    function (res) {
      res.headers['Access-Control-Allow-Origin'] = '*'; // allow XSS
      cliRes.writeHead(res.statusCode, res.headers);
      res.pipe(cliRes);
    }
  );
  cliReq.pipe(req);
}).listen(PROXY_PORT);
