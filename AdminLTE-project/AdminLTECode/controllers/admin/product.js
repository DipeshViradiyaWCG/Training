const subcategoryModel = require("../../models/subcategory");
const categoryModel = require("../../models/category");
const productModel = require("../../models/product");

exports.getAddProduct = async function (req, res, next) {
    let subcategories = await subcategoryModel.find().select('subcategoryname').lean();
    // console.log(subcategories);
    res.render("admin/product/add-product", { title: "Add product" , subcategories});
};

exports.postAddProduct = async function (req, res, next) {
    var fileobj = await req.files.productimage;
    let subcategory = await subcategoryModel.findOne({subcategoryname : req.body._subcategory}).lean();
    var productAddData = {
            
        productname: req.body.productname,
        productdetail: req.body.productdetail,
        productprice: req.body.productprice,
        productimage: fileobj.name,
        _subcategory: subcategory._id
    }

    fileobj.mv('public/images/'+fileobj.name, function (err) {
        if (err)
            return res.send("File not uploaded...public");
    });

    let productobj = await productModel.create(productAddData);
    res.redirect("/admin/product/add")

};

exports.getDisplayProduct = async function (req, res, next) {
    let products = await productModel.find().populate({
        path : '_subcategory',
        populate : {
            path : '_category',
        }
    }).lean();
    res.render("admin/product/display-product", {products});
    // console.log(products);
    // console.log(products[0]._subcategory._category);
};

exports.getEditProduct = async function (req, res, next) {
    let products = await productModel.findOne({_id : req.params.id}).populate({
        path : '_subcategory',
        populate : {
            path : '_category',
        }
    }).lean();
    let subcategories = await subcategoryModel.find().lean();
    // console.log(products);
    // console.log(subcategories);
    res.render("admin/product/edit-product", {products, subcategories});
};

exports.postEditProduct = async function (req, res, next) {
    var fileobj = await req.files.productimage;
    let subcategory = await subcategoryModel.findOne({subcategoryname : req.body._subcategory}).lean();

    var productAddData = {
            
        productname: req.body.productname,
        productdetail: req.body.productdetail,
        productprice: req.body.productprice,
        productimage: fileobj.name,
        _subcategory: subcategory._id
    }

    fileobj.mv('public/images/'+fileobj.name, function (err) {
        if (err)
            return res.send("File not uploaded...public");
    });

    let productobj = await productModel.findByIdAndUpdate(req.params.id ,productAddData);
    res.redirect("/admin/product/display")

};

exports.getDeleteProduct = async function (req, res, next) {
    try {
        await productModel.findByIdAndDelete(req.params.id);
        res.redirect("/admin/product/display");
    } catch (error) {
      next(error);
    }
};