const categoryModel = require("../../models/category");

const showError = require("../../utilities/showError");

// Render add category form
exports.getAddCategory = function (req, res, next) {
  res.render("admin/product/category/add-category", { title: "Add Category" });
};

// Add category data in db
exports.postAddCategory = async function (req, res, next) {
  const { categoryname } = req.body;
  try {
    await categoryModel.create({ categoryname });
    res.redirect("/admin/category/add");
  } catch (error) {
    showError(error);
  }
};

// Get and render category data 
exports.getDisplayCategory = async function (req, res, next) {
  try {
    let categories = await categoryModel.find().lean();
    res.render("admin/product/category/display-category", {
      title: "Display Category",
      categories,
    });    
  } catch (error) {
    showError(error);
  }
};

// Render edit category form
exports.getEditCategory = async function (req, res, next) {
  try {
    const categoryObject = await categoryModel
      .findById(req.params.id)
      .select("categoryname")
      .lean();
    res.render("admin/product/category/edit-category", {
      title: "Edit Category",
      categoryname: categoryObject.categoryname,
    });
  } catch (error) {
    showError(error);
  }
};

// Edit user category in db
exports.postEditCategory = async function (req, res, next) {
  const { categoryname } = req.body;
  try {
    await categoryModel.findByIdAndUpdate(req.params.id, { categoryname });
    res.redirect("/admin/category/display");
  } catch (error) {
    showError(error);
  }
};

// Delete category data in db
exports.getDeleteCategory = async function (req, res, next) {
  try {
    await categoryModel.findByIdAndDelete(req.params.id);
    res.redirect("/admin/category/display");
  } catch (error) {
    showError(error);
  }
};
