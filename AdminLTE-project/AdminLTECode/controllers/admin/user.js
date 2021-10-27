const areaModel = require("../../models/area");
const userModel = require("../../models/user");

const showError = require("../../utilities/showError");

// Render add user form
exports.getAddUser = async function (req, res, next) {
    try {
        let areas = await areaModel.find().lean();
        res.render("admin/user/add-user", { title: "Add User", areas });
    } catch (error) {
        showError(error);
    }
};

// Add user data in db
exports.postAddUser = async function (req, res, next) {
    try {
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
                showError(err);
        });
        await userModel.create(userAddData);
        res.redirect("/admin/user/display")
    } catch (error) {
        showError(error);
    }
};

// Get and render user data 
exports.getDisplayUser = async function (req, res, next) {
    try {
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
    } catch (error) {
        showError(error);
    }
};

// Render edit user form
exports.getEditUser = async function (req, res, next) {
    try {
        let users = await userModel.findOne({_id : req.params.id}).populate({
            path : '_area'
        }).lean();
        let areas = await areaModel.find().lean();
        res.render("admin/user/edit-user", {users, areas, selectedArea : users._area.areaname});        
    } catch (error) {
        showError(error);
    }
};

// Edit user data in db
exports.postEditUser = async function (req, res, next) {
    try {
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
        await userModel.findByIdAndUpdate(req.params.id ,userAddData);
        res.redirect("/admin/user/display")        
    } catch (error) {
        showError(error);
    }

};

// Delete user data in db
exports.getDeleteUser = async function (req, res, next) {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.redirect("/admin/user/display");
    } catch (error) {
        showError(error);
    }
};