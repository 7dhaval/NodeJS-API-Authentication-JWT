const JWT = require("jsonwebtoken");
const createHttpError = require("http-errors");


module.exports = {
    signAccessToken : (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
            }      
            const secret= process.env.ACCESS_TOKEN_SECRET
            const options={
                expiresIn: "40s",
                issuer : "website.com",
                audience: userId,
            }
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                console.log(err.message);
                reject(createHttpError.InternalServerError())
                return
            }
                resolve(token)
            })
        })
    },
    verfiyAccessToken: (req,res,next) => {
        if (!req.headers['authorization']) return next(createHttpError.Unauthorized())
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if(err){
                const message =
                err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
                return next(createHttpError.Unauthorized(message))
            }
            req.payload = payload
            next()
        })
    },

    signRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
          const payload = {}
          const secret = process.env.REFRESH_TOKEN_SECRET
          const options = {
            expiresIn: '1y',
            issuer: 'website.com',
            audience: userId,
          }
          JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
              console.log(err.message)
              // reject(err)
              reject(createHttpError.InternalServerError())
            }
    
            // client.SET(userId, token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
            //   if (err) {
                // console.log(err.message)
                // reject(createError.InternalServerError())
                // return
            //   }
              resolve(token)
            })
          })
        // })
      },
 
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
          JWT.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, payload) => {
              if (err) return reject(createHttpError.Unauthorized())
              const userId = payload.aud
            //   client.GET(userId, (err, result) => {
                // if (err) {
                //   console.log(err.message)
                //   reject(createHttpError.InternalServerError())
                //   return
                // }
                // if (refreshToken === result) return resolve(userId)
                // reject(createHttpError.Unauthorized())
            //   })
            resolve(userId)
            }
          )
        })
      },
    
}