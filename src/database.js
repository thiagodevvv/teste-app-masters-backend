const {MongoClient} = require('mongodb')
const DB_URL = process.env.DB_URL

async function connectDB () {
    try {
        const client = await MongoClient.connect(DB_URL, {useNewUrlParser: true,useUnifiedTopology: true})
        return client
    }catch (err) {
        if (err) console.log(`Erro ao conectar com o banco de dados`)
    }
}


module.exports = {
    connectDB
}

