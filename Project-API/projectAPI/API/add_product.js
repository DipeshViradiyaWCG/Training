exports.add_product = function (req, res, next) {
    return new Promise((resolve, reject) => {
        resolve({msg : "Hello API user..."});
    })
    res.status(200).json({msg : "Hello API user..."});
};