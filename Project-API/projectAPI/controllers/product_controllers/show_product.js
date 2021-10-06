const product_model = require("../../models/product_model");
const category_model = require("../../models/category_model");
const user_model = require("../../models/user_model");
// const prioritize = require("./prioritize_products");
// const userExists = require("../middlewares/isLogin");



// exports.show_products_get = function(req, res, next){
//     product_model.find().lean().then((data) => {
//         res.render('index', {productdata : data});
//     }).catch((err) => {
//         throw err;
//     });
// };

function prioritize(preferred_gender, data) {
    // var len = data.length;
    let point1 = 0;
    // let point2 = 1;
    for (let index = 0; index < data.length; index++) {
        if(data[index].gender_ref == preferred_gender){
            // swap(data[index], data[point1]);
            var temp = data[index];
            data[index] = data[point1];
            data[point1] = temp;
            point1++;
            // point2++;
        }
    }
    return data;
};
var preferred_gender = "all";

exports.show_products_get = function(req, res, next){
    product_model.find().populate('product_category').lean().then((data) => {
        console.log(typeof data);
        console.log(data);
        // var tempdata = prioritize("male", data);
        // console.log(tempdata);
        preferred_gender = req.session.ugender;
        data = prioritize(preferred_gender, data);
        res.render('index', {productdata : data, userExist : req.session.uid ? true : false});
    }).catch((err) => {
        throw err;
    });
};


exports.show_product_get = function(req, res, next){
    console.log("in show");
    product_model.findOne({_id : req.params.id}).populate('product_category').lean().then((data) => {
        console.log("test 1");
        console.log(data);
        res.render('product', {productdata : data, userExist : req.session.uid ? true : false});
    }).catch((err) => {
        throw err;
    });
};

exports.show_products_get_all = function(req, res, next){
    console.log("in show");
    product_model.find().populate('product_category').lean().then((data) => {
        console.log("test 1");
        category_model.find().lean().then((category_data) => {
            console.log("test 2");
            console.log(category_data);
            // console.log("category_data     =>     "+ category_data);
            preferred_gender = req.session.ugender;
            data = prioritize(preferred_gender, data);
            res.render('products', {productdata : data, categories : category_data, userExist : req.session.uid ? true : false});
        }).catch((err) => {
            throw err;
        });
    }).catch((err) => {
        throw err;
    });
};

exports.show_products_by_category = function (req, res, next) {
    console.log(req.params.category);


    category_model.find({category_name : req.params.category}).lean().then((categorydata) => {
        // console.log("cat data" + JSON.stringify(categorydata));
        product_model.find({product_category : categorydata[0]._id}).lean().then((data) => {
            // console.log("data" + data);
            category_model.find().lean().then((category_data) => {
                // console.log("category_data     =>     "+ category_data);
                preferred_gender = req.session.ugender;
                data = prioritize(preferred_gender, data);
                res.render('products', {productdata : data, categories : category_data, userExist : req.session.uid ? true : false});
            }).catch((err) => {
                throw err;
            });           // res.render('show-products', {productdata : data, categories : category_data});
        }).catch((Err) => {
            throw err;
        });
    }).catch((err) => {
        throw err;
    });




    // product_model.find().lean().then((data) => {
    //     category_model.find().lean().then((category_data) => {
    //         console.log("category_data     =>     "+ category_data);
    //         console.log(data);
    //         preferred_gender = req.session.ugender;
    //         data = prioritize(preferred_gender, data);
    //         res.render('products', {productdata : data, categories : category_data, userExist : req.session.uid ? true : false});
    //     }).catch((err) => {
    //         throw err;
    //     });
    // }).catch((err) => {
    //     throw err;
    // });
};
