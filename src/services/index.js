const axios = require('axios').default

async function getAllRegister (req,res) {
    const response = await axios.get('https://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json')
    console.log(response.data)
   
    return res.status(200)
}


function getRegister (req,res) {
    const response = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${440}`)
    console.log(response.data)
}


module.exports = {
    getAllRegister,
    getRegister
}
