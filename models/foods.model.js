// models/foods

const { Schema, model, SchemaTypes} = require("mongoose")

const FoodSchema = new Schema({
    brand: SchemaTypes.String,
    productname: SchemaTypes.String,
    price: SchemaTypes.Number,
    weight: SchemaTypes.Number,
    taste: SchemaTypes.Array,
})

const Food = model("Food", FoodSchema)

module.exports = Food;