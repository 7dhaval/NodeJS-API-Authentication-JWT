//to generate new keys super secrett key for signing jwt
const crypto = require("crypto");
const key1 = crypto.randomBytes(32).toString('hex')
const key2 = crypto.randomBytes(32).toString('hex')
console.table({key1, key2})

//to generate key file you need to run this file specific