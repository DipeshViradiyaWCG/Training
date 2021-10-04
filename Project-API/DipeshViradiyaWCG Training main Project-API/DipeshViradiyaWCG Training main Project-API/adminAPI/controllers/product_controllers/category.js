const category_model = require("../../models/category_model");

//Add student
exports.add_category_get = function(req, res, next){
    res.render('product-views/add-category');
};

exports.add_category_post = function(req, res, next){
    // var fileobj = req.files.productimg;
    var category_add_data = {
        category_name : req.body.name,
        products : req.body.products
    }
    new category_model(category_add_data).save((err, data) => {
        if (err)
            throw err;
        else {
            // console.log(data);
            res.redirect('/dashboard');
        }
    });
    // res.render('student-views/add-student');
};