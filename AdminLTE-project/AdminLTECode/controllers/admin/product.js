const subcategoryModel = require("../../models/subcategory");
const productModel = require("../../models/product");

const showError = require("../../utilities/showError");

// Render add product form
exports.getAddProduct = async function (req, res, next) {
    try {
        let subcategories = await subcategoryModel.find().select('subcategoryname').lean();
        res.render("admin/product/product/add-product", {
            title: "Add product",
            subcategories
        });
    } catch (error) {
        showError(error);
    }
};

// Add product data in db
exports.postAddProduct = async function (req, res, next) {
    try {
        var fileobj = await req.files.productimage;
        let subcategory = await subcategoryModel.findOne({
            subcategoryname: req.body._subcategory
        }).lean();
        var productAddData = {
            productname: req.body.productname,
            productdetail: req.body.productdetail,
            productprice: req.body.productprice,
            productimage: fileobj.name,
            _subcategory: subcategory._id
        }
        fileobj.mv('public/images/' + fileobj.name, function (err) {
            if (err)
                return res.send("File not uploaded...public");
        });
        await productModel.create(productAddData);
        res.redirect("/admin/product/add")
    } catch (error) {
        showError(error);
    }

};

// Get and render product data 
exports.getDisplayProduct = async function (req, res, next) {
    try {
        let products = await productModel.find().populate({
            path: '_subcategory',
            populate: {
                path: '_category',
            }
        }).lean();
        res.render("admin/product/product/display-product", {
            products
        });
    } catch (error) {
        showError(error);
    }
};

// Render edit product form
exports.getEditProduct = async function (req, res, next) {
    try {
        let products = await productModel.findOne({
            _id: req.params.id
        }).populate({
            path: '_subcategory',
            populate: {
                path: '_category',
            }
        }).lean();
        let subcategories = await subcategoryModel.find().lean();
        res.render("admin/product/product/edit-product", {
            products,
            subcategories,
            selectedSubcategory: products._subcategory.subcategoryname
        });
    } catch (error) {
        showError(error);
    }
};

// Edit user product in db
exports.postEditProduct = async function (req, res, next) {
    try {
        var fileobj = await req.files.productimage;
        let subcategory = await subcategoryModel.findOne({
            subcategoryname: req.body._subcategory
        }).lean();
        var productAddData = {
            productname: req.body.productname,
            productdetail: req.body.productdetail,
            productprice: req.body.productprice,
            productimage: fileobj.name,
            _subcategory: subcategory._id
        }
        fileobj.mv('public/images/' + fileobj.name, function (err) {
            if (err)
                return res.send("File not uploaded...public");
        });
        await productModel.findByIdAndUpdate(req.params.id, productAddData);
        res.redirect("/admin/product/display")
    } catch (error) {
        showError(error);
    }
};

// Delete product data in db
exports.getDeleteProduct = async function (req, res, next) {
    try {
        await productModel.findByIdAndDelete(req.params.id);
        res.redirect("/admin/product/display");
    } catch (error) {
        showError(error);
    }
};