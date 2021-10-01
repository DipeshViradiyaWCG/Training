const product_model = require("../../models/product_model");

//Read product

exports.delete_product_get = function (req, res, next) {
    product_model.findByIdAndRemove(req.params.id).then((data) => {
        console.log(data);
        res.redirect('/show-products');
        
    }).catch((err) => {
        throw err;
    });
};