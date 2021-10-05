const product_model = require("../../models/product_model");
const category_model = require("../../models/category_model");

//Add student
exports.add_product_get = function(req, res, next){
    category_model.find().lean().then((data) => {
        res.render('product-views/add-product', {categories : data});
    }).catch((err) => {
        throw err;
    })
    // res.render('product-views/add-product');
};

exports.add_product_post = function(req, res, next){
    var fileobj = req.files.productimg;
    console.log(req.body);
    category_model.find({category_name : req.body.productcategory}).lean().then((categorydata) => {
        var product_add_data = {
            
            product_name : req.body.productname,
            product_category : categorydata._id,
            price : req.body.price,
            product_desc : req.body.productdesc,
            product_img : fileobj.name,
            gender_ref : req.body.gender_ref
        }
        fileobj.mv('public/images/'+fileobj.name, function (err) {
            if (err)
                return res.send("File not uploaded...public");
            fileobj.mv('/home/webcodegenie/Documents/WCG dipesh/Training 2021 codes/Aug - Sept/Training/Project-API/projectAPI/public/images/'+fileobj.name, function (err) {
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

    }).catch((err) => {
        throw err;
    });
    // res.render('student-views/add-student');
};