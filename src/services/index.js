const axios = require('axios').default
const {connectDB} = require('../database')
async function getAllRegister (req,res) {
    try {
        const response = await axios.get('https://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json')
        if(response.data) return res.status(200).send(response.data)
    }catch(err) {
        if(err) console.log(`Erro na obtenção de dados ${err}`)
    }
}


async function getRegister (req,res) {
    const {id} = req.params
    try {
        const response = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${id}`)
        if(response.data) return res.status(200).send(response.data)
    }catch (err) {
        if(err) console.log(`Erro na obtenção de dados ${err}`)
    }
}

async function favorite (req,res) {
    const client =  await connectDB()
    const clientConnected = await client.db('DB_TESTE_APP_MASTER')
    const response = await clientConnected.collection('favorites').insertOne({"favorite": "teste"})
    if(clientConnected) return res.status(200).send(response.data)
}

module.exports = {
    getAllRegister,
    getRegister,
    favorite
}
