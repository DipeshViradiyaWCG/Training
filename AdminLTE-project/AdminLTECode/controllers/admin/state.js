const stateModel = require("../../models/state");
const showError = require("../../utilities/showError");

// Render add state form
exports.getAddState = function (req, res, next) {
    res.render("admin/product/state/add-state", { title: "Add State" });
};

// Add state data in db
exports.postAddState = async function (req, res, next) {
    const { statename } = req.body;
    try {
      await stateModel.create({ statename });
      res.redirect("/admin/state/add");
    } catch (error) {
      showError(error);
    }
};

// Get and render state data 
exports.getDisplayState = async function (req, res, next) {
  try {
    let states = await stateModel.find().lean();
    res.render("admin/product/state/display-state", {
      title: "Display state",
      states,
    });
  } catch (error) {
    showError(error);
  }
};

// Render edit state form
exports.getEditState = async function (req, res, next) {
    try {
      const stateObject = await stateModel
        .findById(req.params.id)
        .select("statename")
        .lean();
      res.render("admin/product/state/edit-state", {
        title: "Edit State",
        statename: stateObject.statename,
      });
    } catch (error) {
      showError(error);
    }
};

// Edit state data in db
exports.postEditState = async function (req, res, next) {
    const { statename } = req.body;
    try {
      await stateModel.findByIdAndUpdate(req.params.id, { statename });
      res.redirect("/admin/state/display");
    } catch (error) {
      showError(error);
    }
};

// Delete state data in db
exports.getDeleteState = async function (req, res, next) {
    try {
      await stateModel.findByIdAndDelete(req.params.id);
      res.redirect("/admin/state/display");
    } catch (error) {
      showError(error);
    }
};
  