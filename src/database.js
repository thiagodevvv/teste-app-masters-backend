const {MongoClient} = require('mongodb')


// - Nunca usar isso em produção, dados ULTRA sensíveis.
// - Esconderiamos em um arquivo .env
const URL = 'mongodb+srv://lemao:testeappmasters@cluster0.5yxjf.mongodb.net/DB_TESTE_APP_MASTER?retryWrites=true&w=majority'



async function connectDB () {
    const client = await MongoClient.connect(URL, {useNewUrlParser: true,useUnifiedTopology: true})
    return client
}


module.exports = {
    connectDB
}

