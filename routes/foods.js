const express = require("express");
const { findByIdAndDelete } = require("../models/foods.model");
const router = express.Router();
const Food = require("../models/foods.model")
const auth = require("../auth-middleware")
 
// get all foods
router.get("/foods", async function(request, response, next){
 
    try {
        let result = await Food.find()
 console.log(result)
        response.json(result);
 
    } catch (error) {
       return next(error)
    }
 
})

// get single food by ID

router.get("/foods/:foodId", async function(request, response, next){

    try {
        let result = await Food.findById(request.params.foodId)

        // return 404 if no result is found
        if(result == null){
            return next(new Error("Cannot find requested resource"))
        }

        // - behøver ikke have denne linje med, fordi det er 200 automatisk - "response.status(200)"
        response.json(result)

    } catch (error) {
        return next(error)
        
    }
})

router.post("/foods", auth, async function(request, response, next){
 
    try {
        let food = new Food({
            brand: request.fields.brand,
            productname: request.fields.productname,
            price: request.fields.price,
            weight: request.fields.weight,
            taste: request.fields.taste,
        })
        food.save();
 
        response.status(201);
        response.json(food)
 
    } catch (error) {
        return next(error)
    }
 
})
 
router.patch("/foods/:foodId", auth, async function(request, response, next){
    let { brand, productname, price, weight, taste } = request.fields
    let updateObject = {}

    if(brand) updateObject.brand = brand;
    if(productname) updateObject.productname = productname;
    if(price) updateObejct.price = price;
    if(weight) updateObejct.weight = weight;
    if(taste) updateObejct.taste = taste;

    let food = await Food.findByIdAndUpdate(request.params.foodId, updateObject, {new:true})
    //let Food = Animal.findById()

    response.json(food)
})
 
router.delete("/foods/:foodId", auth, async function(request, response, next){
    try {
        await Food.findByIdAndDelete(request.params.foodId)

        response.status(200)
        response.end()
    } catch (error) {
        return next(error)
    }
})
 
module.exports = router;