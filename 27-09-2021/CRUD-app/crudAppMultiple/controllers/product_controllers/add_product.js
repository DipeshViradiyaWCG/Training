const product_model = require("../../models/product_model");

//Add student
exports.add_product_get = function(req, res, next){
    res.render('product-views/add-product');
};

exports.add_product_post = function(req, res, next){
    var product_add_data = {
        product_name : req.body.productname,
        product_category : req.body.productcategory,
        price : req.body.price,
        product_desc : req.body.productdesc
    }

    new product_model(product_add_data).save((err, data) => {
        if (err)
            throw err;
        else {
            console.log(data);
            res.redirect('/show');
        }
    });
    // res.render('student-views/add-student');
};