const express = require("express");
const { findByIdAndDelete } = require("../models/accessories.model");
const router = express.Router();
const Accessories = require("../models/accessories.model")
const auth = require("../auth-middleware")
 
// get all Accessoriess
router.get("/accessories", async function(request, response, next){
 
    try {
        let result = await Accessories.find()
 //console.log(result)
        response.json(result);
 
    } catch (error) {
       return next(error)
    }
 
})

// get single Accessories by ID

router.get("/accessories/:accessoriesId", async function(request, response, next){

    try {
        let result = await Accessories.findById(request.params.accessoriesId)

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

router.post("/accessories", auth, async function(request, response, next){
 
    try {
        let accessories = new Accessories({
            brand: request.fields.brand,
            productname: request.fields.productname,
            producttype: request.fields.producttype,
            price: request.fields.price,
        })
        accessories.save();
 
        response.status(201);
        response.json(accessories)
 
    } catch (error) {
        return next(error)
    }
 
})
 
router.patch("/accessories/:accessoriesId", auth, async function(request, response, next){
    let { brand, productname, producttype, price } = request.fields
    let updateObject = {}

    if(brand) updateObject.brand = brand;
    if(productname) updateObject.productname = productname;
    if(producttype) updateObejct.producttype = producttype;
    if(price) updateObejct.price = price;

    let accessories = await Accessories.findByIdAndUpdate(request.params.accessoriesId, updateObject, {new:true})
    //let animal = Animal.findById()

    response.json(accessories)
})
 
router.delete("/accessoriess/:accessoriesId", auth, async function(request, response, next){
    try {
        await Accessories.findByIdAndDelete(request.params.accessoriesId)

        response.status(200)
        response.end()
    } catch (error) {
        return next(error)
    }
})
 
module.exports = router;