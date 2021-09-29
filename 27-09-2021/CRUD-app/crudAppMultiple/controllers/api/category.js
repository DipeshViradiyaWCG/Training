const category_model = require("../../models/category_model");

exports.filter_by_category_get = function (req, res, next) {
    category_model.find({category_name : })  
};
