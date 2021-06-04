module.exports = function (request, response, next){
    console.log(request.headers)

    if(!request.headers.authorization){
        response.status(401).end()
        return
    }

    if(request.headers.authorization != `Bearer ${process.env.TOKEN}`){
        response.status(403).send("WRONG DUDE!!")
        return

    }
    next()
}