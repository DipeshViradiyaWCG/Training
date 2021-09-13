var fs = require('fs');

var fileData = "Dipesh\'s demo file to write in demo.txt";

fs.writeFile('demo.txt', fileData, (err) => {
    if (err) throw err;
    console.log('File created and text added...');
});

fs.appendFile('demo.txt', "Appended text", (err) => {
    if (err) throw err;
    console.log('File text added...');
});

fs.readFile('demo.txt', (err, data) => {
    if (err) throw err;
    console.log('File data is - ' + data);
});

fs.stat('demo.txt', function(err, stats){
    if (err) throw err;
    console.log('File stat is - ' + JSON.stringify(stats));
});
