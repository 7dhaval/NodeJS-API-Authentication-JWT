const mongoose = require('mongoose')

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URI , {
    dbname: process.env.DB_NAME,
    useNewUrlParser : true
})
 .then(() => {
     console.log('mongodb connected.');
 })
 .catch((err) => console.log(err.message))

 mongoose.connection.on('connected' , () => {
     console.log('Mongoose connected to DB');
 })

 mongoose.connection.on('error', (err) => {
     console.log(err.message);
 })

 mongoose.connection.on('disconnected', (err) => {
    console.log('Mongoose Connection is Disconnected');
})
process.on('SIGINT', async () =>{
    await mongoose.connection.close()
    process.exit(0)
})