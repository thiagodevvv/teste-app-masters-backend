const {MongoClient} = require('mongodb')


// - Nunca usar isso em produção, dados ULTRA sensíveis.
// - Esconderiamos em um arquivo .env
const URL = 'mongodb+srv://app-master:mecontrata@cluster0.7gdhq.mongodb.net/DB_FAVORITOS?retryWrites=true&w=majority'



async function connectDB () {
    const client = await MongoClient.connect(URL, {useNewUrlParser: true,useUnifiedTopology: true})
    return client
}


module.exports = {
    connectDB
}

