const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('page1');
})

app.post('/', (req, res) => {
    // console.log(req.body);
    res.render('page2', {userdata : req.body});
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})