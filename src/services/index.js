const axios = require('axios').default
const NodeCache = require("node-cache")
const {connectDB} = require('../database')

const cache = new NodeCache({ stdTTL: 3600 })


function verifyCache (req,res,next) {
    if(!req.headers['user-hash']) {
        return res.send([])
    }
    try {
        if (cache.has(req.headers['user-hash'])) {
            return res.status(200).json(cache.get(req.headers['user-hash']))
        }
        return next()
    }catch (err) {
        if(err) console.log(`Erro ao fazer cache dos dados ${err}`)
    }

}

async function getAllRegister (req,res) {
    try {
        const {data} = await axios.get('https://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json')
        const {applist} = data
        const {apps} = applist
        if(!req.headers['user-hash']) {
            return res.send([])
        }
        cache.set(req.headers['user-hash'], apps)
        return res.status(200).send(apps)
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
        if(err) console.log(`Erro na obtenção de dados do jogo ${err}`)
    }
}


async function AddFavorite (req,res) {
    const {id_game, rating, type, name, header_image, detailed_description , is_free } = req.body
    if(!req.headers['user-hash']) {
        return res.send([])
    }
    try {
        const client =  await connectDB()
        const clientConnected = await client.db('DB_FAVORITOS')
        await clientConnected.collection('favorites').insertOne({id_game, rating, type, name, detailed_description, is_free, header_image, iduser: req.headers['user-hash']})
        return res.status(200).send({ok: "ok"})
    }catch(err) {
        if(err) console.log(`Erro ao favoritar jogo: ${err}`)
    }
}

async function removeFavorite (req,res) {
    if(!req.headers['user-hash']) {
        return res.send([])
    }
    const {appid} = req.params
    try {
        const client =  await connectDB()
        const clientConnected = await client.db('DB_FAVORITOS')
        const response = await clientConnected.collection('favorites').findOneAndDelete({id_game: appid, iduser: req.headers['user-hash']})
        if(response.lastErrorObject.n === 0) {
            return res.status(400).send('Usuário não pode deletar esse favorito')
        }
        return res.status(200).send({ok: "ok"})
    }catch(err) {
        if(err) console.log(`Erro ao deletar favorito: ${err}`)
    }
}

async function getFavorites (req,res) {
    if(!req.headers['user-hash']) {
        return res.send([])
    }
    try {
        const client =  await connectDB()
        const clientConnected = await client.db('DB_FAVORITOS')
        const response = await clientConnected.collection('favorites').find({iduser: req.headers['user-hash']}).toArray()
        return res.status(200).send(response)
    }catch(err) {
        if(err) console.log(`Erro ao encontrar favoritos: ${err}`)
    }  
}


module.exports = {
    getAllRegister,
    getRegister,
    AddFavorite,
    removeFavorite,
    getFavorites,
    verifyCache
}
