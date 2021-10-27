const cityModel = require("../../models/city");
const areaModel = require("../../models/area");

const showError = require("../../utilities/showError");

// Render add area form
exports.getAddArea = async function (req, res, next) {
    try {
        let cities = await cityModel.find().lean();
        res.render("admin/product/area/add-area", { title: "Add Area", cities });
    } catch (error) {
        showError(error);
    }
};

// Add area data in db
exports.postAddArea = async function (req, res, next) {
    const {areaname, _city} = req.body;
    try {
        let city = await cityModel.findOne({cityname : _city}).lean();
        await areaModel.create({areaname : areaname, _city : city._id});
        res.redirect("/admin/area/add");
    } catch (error) {
        showError(error);
    }
};

// Get and render area data 
exports.getDisplayArea = async function (req, res, next) {
    try {
        let areas = await areaModel.find().populate({
            path : '_city',
            populate : {
                path : '_state',
            }
        }).lean();
        res.render("admin/product/area/display-area", {
          title: "Display Area",
          areas,
        });        
    } catch (error) {
        showError(error);
    }
};

// Render edit area form
exports.getEditArea = async function (req, res, next) {
    try {
        let areas = await areaModel.findOne({_id : req.params.id}).populate({
            path : '_city',
            populate : {
                path : '_state',
            }
        }).lean();
        let cities = await cityModel.find().lean();
        res.render("admin/product/area/edit-area", {areas, cities, selectedCity : areas._city.cityname});
    } catch (error) {
        showError(error);
    }
};

// Edit area data in db
exports.postEditArea = async function (req, res, next) {
    try {
        let city = await cityModel.findOne({cityname : req.body._city}).lean();
        var areaAddData = {
            areaname: req.body.areaname,
            _city: city._id
        }
        await areaModel.findByIdAndUpdate(req.params.id ,areaAddData);
        res.redirect("/admin/area/display")        
    } catch (error) {
        showError(error);
    }
};

// Delete area data in db
exports.getDeleteArea = async function (req, res, next) {
    try {
        await areaModel.findByIdAndDelete(req.params.id);
        res.redirect("/admin/area/display");
    } catch (error) {
        showError(error);
    }
};
