const product_model = require("../../models/product_model");

//Add student
exports.add_product_get = function(req, res, next){
    res.render('product-views/add-product');
};

exports.add_product_post = function(req, res, next){
    var fileobj = req.files.productimg;
    var product_add_data = {
        product_name : req.body.productname,
        product_category : req.body.productcategory,
        price : req.body.price,
        product_desc : req.body.productdesc,
        product_img : fileobj.name
    }
    fileobj.mv('public/images/'+fileobj.name, function (err) {
        if (err)
            return res.send("File not uploaded...public");
        fileobj.mv('D:/WCG/project-api-demo/DipeshViradiyaWCG Training main Project-API/projectAPI/public/images/'+fileobj.name, function (err) {
            if (err)
                return res.send("File not uploaded...data");
        });
    });
    new product_model(product_add_data).save((err, data) => {
        if (err)
            throw err;
        else {
            // console.log(data);
            res.redirect('/dashboard');
        }
    });
    // res.render('student-views/add-student');
};