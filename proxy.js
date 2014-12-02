var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var filelist = {
  "/"           : 1,
  "/ccchart.js" : 1
};
var extfmt = {
  ".html" : "text/html; charset=utf-8",
  ".js"   : "application/javascript; charset=utf-8"
};

http.createServer(function(cliReq, cliRes) {
  var x = url.parse(cliReq.url);
  var ts = parseInt((new Date).getTime()/1000);
  var return_error = function(res, code, msg) {
    res.writeHead(code, {'Content-Type': 'text/html'});
    res.write("<!DOCTYPE html><html><body><h1>" + code + " " + msg + "</h1></body></html>");
    res.end();
  };

  if (filelist[x.path]) {
    var filename = x.path;
    if (x.path == '/')
      filename = '/index.html';
    var file = fs.createReadStream("." + filename);
    var fmt = extfmt[path.extname(filename)] || "text/lain";
    cliRes.writeHead(200, {'Content-Type': fmt});
    file.on('data', function(data) {
       cliRes.write(data);
    });
    file.on('close', function() {
       cliRes.end();
    });
    file.on('error', function(err) {
       return_error(cliRes, 500, "Internal Server Error");
    });
    return;
  }
  var dstpath;
  switch (x.path.substring(0, 2)) {
    case '/r':
      dstpath = "/get/top.cgi";
      break;
    case '/t':
      dstpath = "/get/top_val.cgi?poll=" + ts;
      break;
    case '/p': // "/p0" .. "/p3"
      index = x.path.substring(2, 3);
      dstpath = "/get/instantvaldata.cgi?pageno=" + index + "&poll=" + ts;
      break;
    case '/l':
      dstpath = "/set/exectop2.cgi";
      break;
    default:
      return_error(cliRes, 404, "Not Found");
      return;
  }
  var req = http.get(
    {
      host: 'AISEG_HOST',
      port: 80,
      path: dstpath,
      auth: 'AiSEG:AISEG_PASS'
    },
    function(res) {
      cliRes.writeHead(res.statusCode, res.headers);
      res.pipe(cliRes);
    }
  );
  cliReq.pipe(req);
}).listen(PROXY_PORT);
