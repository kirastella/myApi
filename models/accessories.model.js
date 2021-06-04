// models/accessories

const { Schema, model, SchemaTypes} = require("mongoose")

const AccessorieSchema = new Schema({
    brand: SchemaTypes.String,
    productname: SchemaTypes.String,
    producttype: SchemaTypes.String,
    price: SchemaTypes.Number,
})

const Accessories = model("Accessories", AccessorieSchema)

module.exports = Accessories;