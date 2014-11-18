var http = require('http');
var url = require('url');
http.createServer(function onCliReq(cliReq, cliRes) {
  var x = url.parse(cliReq.url);
  var opt = {
    host: 'AISEG_HOST',
    port: 80,
    method: cliReq.method,
    headers: cliReq.headers
  };
  var path;
  var ts = parseInt((new Date)/1000);
  switch (x.path) {
    case '/t':
      path = "/get/top_val.cgi";
      break;
    case '/p0':
      path = "/get/instantvaldata.cgi?pageno=0&poll=" + ts;
      break;
    case '/p1':
      path = "/get/instantvaldata.cgi?pageno=1&poll=" + ts;
      break;
    case '/p2':
      path = "/get/instantvaldata.cgi?pageno=2&poll=" + ts;
      break;
    case '/p3':
      path = "/get/instantvaldata.cgi?pageno=3&poll=" + ts;
      break;
    case '/l':
      path = "/set/exectop2.cgi";
      break;
    default:
      cliRes.writeHead(404, {'Content-Type': 'text/html'});
      cliRes.write("<html><body>404 Not Found</body></html>");
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
      res.headers['Access-Control-Allow-Origin'] = '*';
      cliRes.writeHead(res.statusCode, res.headers);
      res.pipe(cliRes);
    }
  );
  cliReq.pipe(req);
}).listen(PROXY_PORT);
