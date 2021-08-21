const axios = require('axios').default
const NodeCache = require("node-cache")
const {connectDB} = require('../database')

const cache = new NodeCache({ stdTTL: 15 })


function verifyCache (req,res,next) {
    try {
        const { iduser } = req.headers
        if (cache.has(iduser)) {
            return res.status(200).json(cache.get(iduser))
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
        const {iduser} = req.headers
        cache.set(iduser, apps)
        return res.status(200).send(apps)
    }catch(err) {
        if(err) console.log(`Erro na obtenção de dados ${err}`)
    }
}


async function getRegister (req,res) {
    console.log('///////////////////')
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
    const {iduser} = req.headers
    try {
        const client =  await connectDB()
        const clientConnected = await client.db('DB_FAVORITOS')
        await clientConnected.collection('favorites').insertOne({id_game, rating, type, name, detailed_description, is_free, header_image, iduser})
        return res.status(200).send({ok: "ok"})
    }catch(err) {
        if(err) console.log(`Erro ao favoritar jogo: ${err}`)
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

async function getFavorites (req,res) {
    const {iduser} = req.headers
    try {
        const client =  await connectDB()
        const clientConnected = await client.db('DB_FAVORITOS')
        const response = await clientConnected.collection('favorites').find({iduser}).toArray()
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
