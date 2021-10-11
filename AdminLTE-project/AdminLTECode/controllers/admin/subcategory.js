const subcategoryModel = require("../../models/subcategory");
const categoryModel = require("../../models/category");


exports.getAddSubCategory = async function (req, res, next) {
    let categories = await categoryModel.find().lean();


    res.render("admin/product/add-subcategory", { title: "Add Sub Category", categories });
  };
  
exports.postAddSubCategory = async function (req, res, next) {
    const {subcategoryname, _category} = req.body;
    try {
        let category = await categoryModel.findOne({categoryname : _category}).lean();
        let subcategoryobj = await subcategoryModel.create({subcategoryname : subcategoryname, _category : category._id});
        res.redirect("/admin/subcategory/add");
    } catch (error) {
        next(error);
    }
   console.log(req.body);
};
  

exports.getDisplaySubCategory = async function (req, res, next) {
    let subcategories = await subcategoryModel.find().populate('_category').lean();
    // console.log(subcategories);

    res.render("admin/product/display-subcategory", {
      title: "Display Sub Category",
      subcategories,
    });
};

exports.getEditSubCategory = async function (req, res, next) {
    try {
      let subcategoryobj = await subcategoryModel
        .findById(req.params.id)
        .populate("_category")
        .lean();

        let categories = await categoryModel.find().lean();


        // console.log(subcategoryObject);
        res.render("admin/product/edit-subcategory", {
            title: "Edit Sub Category",
            subcategoryname : subcategoryobj.subcategoryname,
            categories
        });
    } catch (error) {
        next(err);
    }
};

exports.postEditSubCategory = async function (req, res, next) {
    const {subcategoryname, _category} = req.body;
    let category = await categoryModel.findOne({categoryname : _category}).lean();

    try {
      await subcategoryModel.findByIdAndUpdate(req.params.id, {subcategoryname : subcategoryname, _category : category._id});
      res.redirect("/admin/subcategory/display");
    } catch (error) {
      next(error);
    }
};

exports.getDeleteSubCategory = async function (req, res, next) {
    try {
      await subcategoryModel.findByIdAndDelete(req.params.id);
      res.redirect("/admin/subcategory/display");
    } catch (error) {
      next(error);
    }
  };
  
