const product_model = require("../../models/product_model");

//Read product

exports.edit_product_get = function (req, res, next) {
    product_model.findById(req.params.id).lean().then((data) => {
        // console.log(data);
        res.render('product-views/edit-product', {productdata : data});
        
    }).catch((err) => {
        throw err;
    });
};

exports.edit_product_post = function(req, res, next){
    product_model.findByIdAndUpdate(req.params.id, {
    
        product_name : req.body.productname,
        product_category : req.body.productcategory,
        price : req.body.price,
        product_desc : req.body.productdesc
    
    }).then((data) => {
        // console.log(data);
        res.redirect('/show');
    }).catch((err) => {
        throw err;
    });
};