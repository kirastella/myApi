const express = require("express");
const { findByIdAndDelete } = require("../models/animals.model");
const router = express.Router();
const Animal = require("../models/animals.model")
const auth = require("../auth-middleware")

//MIDDLEWARE EKSEMPEL
/* router.get("/",
function(reg, res, next){

}, 
function(reg, res, next){

}

) */
 
// get all animals
 /* router.get("/animals", async function(request, response, next){
 
    try {
        let result = await Animal.find()
        //console.log(result)
        response.json(result);
 
    } catch (error) {
       return next(error)
    }

    count: 12 
    next: localhost:4000/api/v1/animals?offset=5&limit=5
    previous: null
    results: []
    url: localhost:4000/api/v1/animals?offset=0&limit=5
 
}) */

//http://localhost:4000/api/v1/animals
router.get("/animals", async function (request, response, next) {
 
    let limit = parseInt(request.query.limit) || 5;
    let offset = parseInt(request.query.offset) || 0;
    try {
        // ny kode
 
        let count = (await Animal.find()).length
        let result = await Animal.find().limit(limit).skip(offset) //Skip kan bruges til at springe entries over, men det gør vi ikke
 
        let queryStringNext = `?offset=${offset+limit}$limit=${limit}`
        let queryStringPrevious;
 
        if(offset >= limit) {
            queryStringPrevious = `?offset=${offset - limit}&limit=${limit}`
        }
 
        let apiUrl = `${request.protocol}://${request.hostname}${request.hostname==="localhost" ? ":" + process.env.PORT : ''}`
        let apiPath = `${request.baseUrl}${request.path}`
        console.log(apiUrl);
 
        let output = {
            count,
            next: (offset + limit < count) ? apiUrl + apiPath + queryStringNext: null,
            previous: offset > 0 ? apiUrl + apiPath + queryStringPrevious : null,
            result,
            url: apiUrl + request.originalUrl
        }
 
        response.json(output)
 
    } catch (error) {
        return next(error)
    }
 
})

// get single animal by ID

router.get("/animals/:animalId", async function(request, response, next){

    try {
        let result = await Animal.findById(request.params.animalId)

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

router.post("/animals", auth, function(request, response, next){
 
    try {
        let animal = new Animal({
            type: request.fields.type,
            breed: request.fields.breed,
            name: request.fields.name,
            age: request.fields.age,
            sex: request.fields.sex,
            colors: request.fields.colors
        })
        animal.save();
 
        response.status(201);
        response.json(animal)
 
    } catch (error) {
        return next(error)
    }
 
})
 
router.patch("/animals/:animalId", auth, async function(request, response, next){
    let { type, breed, name, age, sex, colors } = request.fields
    let updateObject = {}

    if(type) updateObject.type = type;
    if(breed) updateObject.breed = breed;
    if(name) updateObject.name = name;
    if(age) updateObject.age = age;
    if(sex) updateObject.sex = sex;
    if(colors) updateObject.colors = colors;

    let animal = await Animal.findByIdAndUpdate(request.params.animalId, updateObject, {new:true})
    //let animal = Animal.findById()

    response.json(animal)
})
 
router.delete("/animals/:animalId", auth, async function(request, response, next){
    try {
        await Animal.findByIdAndDelete(request.params.animalId)

        response.status(200)
        response.end()
    } catch (error) {
        return next(error)
    }
})
 
module.exports = router;