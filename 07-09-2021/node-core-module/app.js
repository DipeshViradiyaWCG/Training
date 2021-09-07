var http = require('http');

http.createServer((req, res) => {
    res.writeHead(200 , {'Content-Type' : 'text/html'})
    res.end('<h2>Hello Node html txt...</h2>');
}).listen(3000);

console.log("Server is running on 127.0.0.1:3000");