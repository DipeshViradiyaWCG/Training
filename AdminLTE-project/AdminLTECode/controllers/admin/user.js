const areaModel = require("../../models/area");
const userModel = require("../../models/user");

exports.getAddUser = async function (req, res, next) {
    let areas = await areaModel.find().lean();
    res.render("admin/user/add-user", { title: "Add User", areas });
};

exports.postAddUser = async function (req, res, next) {
    var fileobj = await req.files.userprofilepic;
    let area = await areaModel.findOne({areaname : req.body._area}).lean();
    const {
        username,
        useremail,
        userpassword,
        usergender,
        useraddress
    } = req.body;
    var userAddData = {
            
        username,
        useremail,
        userpassword,
        usergender,
        useraddress,
        userprofilepic: fileobj.name,
        _area: area._id
    }

    fileobj.mv('public/images/'+fileobj.name, function (err) {
        if (err)
            return res.send("File not uploaded...public");
    });

    let userobj = await userModel.create(userAddData);
    res.redirect("/admin/user/display")

};

exports.getDisplayUser = async function (req, res, next) {
    let users = await userModel.find().populate({
        path : '_area',
        populate : {
            path : '_city',
            populate : {
                path : '_state',
            }
        }
    }).lean();
    res.render("admin/user/display-user", {users});
    // console.log(products);
    // console.log(products[0]._subcategory._category);
};

exports.getEditUser = async function (req, res, next) {
    let users = await userModel.findOne({_id : req.params.id}).populate({
        path : '_area'
        // populate : {
        //     path : '_city',
        //     populate : {
        //         path : '_state',
        //     }
        // }
    }).lean();
    let areas = await areaModel.find().lean();
    // console.log(products);
    // console.log(subcategories);
    res.render("admin/user/edit-user", {users, areas});
};

exports.postEditUser = async function (req, res, next) {
    var fileobj = await req.files.userprofilepic;
    let area = await areaModel.findOne({areaname : req.body._area}).lean();

    const {
        username,
        useremail,
        userpassword,
        usergender,
        useraddress
    } = req.body;
    var userAddData = {
            
        username,
        useremail,
        userpassword,
        usergender,
        useraddress,
        userprofilepic: fileobj.name,
        _area: area._id
    }

    fileobj.mv('public/images/'+fileobj.name, function (err) {
        if (err)
            return res.send("File not uploaded...public");
    });
    let productobj = await userModel.findByIdAndUpdate(req.params.id ,userAddData);
    res.redirect("/admin/user/display")

};

exports.getDeleteUser = async function (req, res, next) {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.redirect("/admin/user/display");
    } catch (error) {
      next(error);
    }
};