var qs = require('querystring');
var url = require('url');

var urldemo = "http://localhost:3000/index.html?name=dipesh&tech=NODE%20JS";

var q = url.parse(urldemo, true);
console.log(q);
console.log(q.host);
console.log(q.pathname);
console.log(q.search);
console.log(q.query.name);
console.log(q.query.tech);

console.log(qs.parse('name=dipesh&project=WCG&tech=NODE%20JS'));
console.log(qs.stringify(qs.parse('name=dipesh&project=WCG&tech=NODE%20JS')));
