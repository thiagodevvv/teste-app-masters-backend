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
    const {id} = req    
    try {
        const response = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${id}`)
        if(response.data) return res.status(200).send(response.data)
    }catch (err) {
        if(err) console.log(`Erro na obtenção de dados ${err}`)
    }
}


async function AddFavorite (req,res) {
    const {id_game, nota} = req.body
    try {
        const client =  await connectDB()
        const clientConnected = await client.db('DB_FAVORITOS')
        await clientConnected.collection('favorites').insertOne({id_game: id_game, nota: nota })
        return res.status(200).send({ok: "ok"})
    }catch(err) {
        if(err) console.log(`Erro ao favoritar: ${err}`)
    }
}

async function removeFavorite (req,res) {
    const {id_game} = req.params
    try {
        const client =  await connectDB()
        const clientConnected = await client.db('DB_FAVORITOS')
        await clientConnected.collection('favorites').findOneAndDelete({id_game: id_game})
        return res.status(200).send({ok: "ok"})
    }catch(err) {
        if(err) console.log(`Erro ao deletar favorito: ${err}`)
    }
}

module.exports = {
    getAllRegister,
    getRegister,
    AddFavorite,
    removeFavorite,
    
}
