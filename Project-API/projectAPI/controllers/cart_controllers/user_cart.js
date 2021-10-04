const user_model = require("../../models/user_model");

exports.user_cart_get = function (req, res, next) {
    res.render("cart");
};