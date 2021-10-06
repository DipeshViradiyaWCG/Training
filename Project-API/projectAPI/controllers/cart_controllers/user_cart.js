const user_model = require("../../models/user_model");
const order_model = require("../../models/order_model");

exports.user_addtocart_get = function (req, res, next) {
    order_model.findOne({user_ref : req.session.uid}).then((order_data) => {
        console.log(order_data);
        console.log(typeof order_data.products_ref);
        // console.log(req);
        let temp_arr = order_data.products_ref
        temp_arr.push(req.params.id);
        
        
        order_model.findOneAndUpdate({user_ref : req.session.uid}, {products_ref : temp_arr})

       .then((data) =>{
            console.log(data);
            res.redirect("/");
        }).catch((err) => {
            throw err;
        });

    }).catch((err) => {
        throw err;
    });
};

exports.user_cart_get = function (req, res, next) {
    order_model.findOne({user_ref : req.session.uid}).populate("products_ref").lean().then((products)=>{
        console.log("Products ==> " + products);
        // const qmap = new Map()
        // for(let i  = 0; i < products.products_ref.length; i++){
        //     if(qmap.has(products.products_ref[i]._id)){
        //         qmap.set(products.products_ref[i]._id, qmap.get(products.products_ref[i]._id) + 1);
        //     } else {
        //         qmap.set(products.products_ref[i]._id, 1);

        //     }
        // }
        // console.log(qmap);
        let amount = 0;
        for(let i  = 0; i < products.products_ref.length; i++){
            amount += Number(products.products_ref[i].price);
        }
        
        res.render("cart" , {products_data : products.products_ref, amount : amount, userExist : req.session.uid ? true : false});
    })
};


exports.user_deletecart_get = function (req, res, next) {
    let p_id = req.params.id;
    order_model.updateOne( {user_ref: req.session.uid}, { $pullAll: {products_ref: [p_id] } } ).then(()=>{
        res.redirect("/user/show-cart");
    }).catch((err)=>{
       console.log(err);
    })

};