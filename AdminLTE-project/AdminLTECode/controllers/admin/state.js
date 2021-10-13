const stateModel = require("../../models/state");

exports.getAddState = function (req, res, next) {
    res.render("admin/product/state/add-state", { title: "Add State" });
};


exports.postAddState = async function (req, res, next) {
    const { statename } = req.body;
    try {
      let stateobj = await stateModel.create({ statename });
      res.redirect("/admin/state/add");
    } catch (error) {
      next(error);
    }
};

exports.getDisplayState = async function (req, res, next) {
    let states = await stateModel.find().lean();
  
    res.render("admin/product/state/display-state", {
      title: "Display state",
      states,
    });
};

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
      next(err);
    }
};

exports.postEditState = async function (req, res, next) {
    const { statename } = req.body;
    try {
      await stateModel.findByIdAndUpdate(req.params.id, { statename });
      res.redirect("/admin/state/display");
    } catch (error) {
      next(error);
    }
};

exports.getDeleteState = async function (req, res, next) {
    try {
      await stateModel.findByIdAndDelete(req.params.id);
      res.redirect("/admin/state/display");
    } catch (error) {
      next(error);
    }
  };
  