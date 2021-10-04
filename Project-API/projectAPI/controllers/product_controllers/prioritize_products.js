// const product_model = require("../../models/product_model");

exports.prioritize = function (preferred_gender, data) {
    // var len = data.length;
    let point1 = 0;
    // let point2 = 1;
    for (let index = 0; index < data.length; index++) {
        if(data[index].gender_ref == preferred_gender){
            // swap(data[index], data[point1]);
            var temp = data[index];
            data[index] = data[point1];
            data[point1] = temp;
            point1++;
            // point2++;
        }
    }
    return data;
};