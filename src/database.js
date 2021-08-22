const {MongoClient} = require('mongodb')
const DB_URL = process.env.DB_URL

async function connectDB () {
    const client = await MongoClient.connect(DB_URL, {useNewUrlParser: true,useUnifiedTopology: true})
    return client
}


module.exports = {
    connectDB
}

