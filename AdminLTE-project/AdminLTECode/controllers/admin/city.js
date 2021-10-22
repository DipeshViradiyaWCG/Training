const stateModel = require("../../models/state");
const cityModel = require("../../models/city");


exports.getAddCity = async function (req, res, next) {
    let states = await stateModel.find().lean();
    res.render("admin/product/city/add-city", { title: "Add City", states });
};

exports.postAddCity = async function (req, res, next) {
    const {cityname, _state} = req.body;
    try {
        let state = await stateModel.findOne({statename : _state}).lean();
        let cityobj = await cityModel.create({cityname : cityname, _state : state._id});
        res.redirect("/admin/city/add");
    } catch (error) {
        next(error);
    }
//    console.log(req.body);
};

exports.getDisplayCity = async function (req, res, next) {
    let cities = await cityModel.find().populate('_state').lean();
    // console.log(subcategories);

    res.render("admin/product/city/display-city", {
      title: "Display City",
      cities,
    });
};

exports.getEditCity = async function (req, res, next) {
    try {
      let cityobj = await cityModel
        .findById(req.params.id)
        .populate("_state")
        .lean();

        let states = await stateModel.find().lean();


        // console.log(subcategoryObject);
        console.log("selected state ==> ", cityobj);
        res.render("admin/product/city/edit-city", {
            title: "Edit City",
            cityname : cityobj.cityname,
            states,
            selectedState : cityobj._state.statename
        });
    } catch (error) {
        next(err);
    }
};

exports.postEditCity = async function (req, res, next) {
    const {cityname, _state} = req.body;
    let state = await stateModel.findOne({statename : _state}).lean();

    try {
      await cityModel.findByIdAndUpdate(req.params.id, {cityname : cityname, _state : state._id});
      res.redirect("/admin/city/display");
    } catch (error) {
      next(error);
    }
};

exports.getDeleteCity = async function (req, res, next) {
    try {
      await cityModel.findByIdAndDelete(req.params.id);
      res.redirect("/admin/city/display");
    } catch (error) {
      next(error);
    }
};