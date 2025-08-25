var mongoose = require('mongoose')

var ProductSchema = mongoose.Schema({
    pname:String,
    pdetail:String,
    pprice:Number
})

//Define the Model
var ProductModel = mongoose.model('product', ProductSchema)

module.exports = ProductModel