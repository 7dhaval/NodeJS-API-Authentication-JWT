const JWT = require("jsonwebtoken");
const createHttpError = require("http-errors");


module.exports = {
    signAccessToken : (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
            }      
            const secret= process.env.ACCESS_TOKEN_SECRET
            const options={
                expiresIn: "1h",
                issuer : "website.com",
                audience: userId,
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                console.log(err.message);
                reject(createHttpError.InternalServerError())
            }
                resolve(token)
            })
        })
    }
}