const cityModel = require("../../models/city");
const areaModel = require("../../models/area");

exports.getAddArea = async function (req, res, next) {
    let cities = await cityModel.find().lean();
    res.render("admin/product/area/add-area", { title: "Add Area", cities });
};

exports.postAddArea = async function (req, res, next) {
    const {areaname, _city} = req.body;
    try {
        let city = await cityModel.findOne({cityname : _city}).lean();
        let areaobj = await areaModel.create({areaname : areaname, _city : city._id});
        res.redirect("/admin/area/add");
    } catch (error) {
        next(error);
    }
//    console.log(req.body);
};

exports.getDisplayArea = async function (req, res, next) {
    let areas = await areaModel.find().populate({
        path : '_city',
        populate : {
            path : '_state',
        }
    }).lean();
    // console.log(subcategories);

    res.render("admin/product/area/display-area", {
      title: "Display Area",
      areas,
    });
};

exports.getEditArea = async function (req, res, next) {
    let areas = await areaModel.findOne({_id : req.params.id}).populate({
        path : '_city',
        populate : {
            path : '_state',
        }
    }).lean();
    let cities = await cityModel.find().lean();
    // console.log(products);
    // console.log(subcategories);
    res.render("admin/product/area/edit-area", {areas, cities, selectedCity : areas._city.cityname});
};

exports.postEditArea = async function (req, res, next) {
    let city = await cityModel.findOne({cityname : req.body._city}).lean();

    var areaAddData = {
            
        areaname: req.body.areaname,
        _city: city._id
    }

    let areaobj = await areaModel.findByIdAndUpdate(req.params.id ,areaAddData);
    res.redirect("/admin/area/display")

};

exports.getDeleteArea = async function (req, res, next) {
    try {
        await areaModel.findByIdAndDelete(req.params.id);
        res.redirect("/admin/area/display");
    } catch (error) {
      next(error);
    }
};
