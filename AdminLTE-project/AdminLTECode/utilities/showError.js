/**
 * 
 * @param {error} err
 * show Error page 
 */
module.exports = (error) => {
    console.log("Error ==> ", error);
    res.render("error", {error});
}