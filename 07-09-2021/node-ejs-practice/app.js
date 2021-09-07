const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/',(req, res) => {
    res.render('index', {
        user : [
            "Rocky",
            "Dipesh",
            "Jenny",
            "John"
        ]
    });
});

app.listen(3000, () => {
    console.log("Running on 3000...");
});