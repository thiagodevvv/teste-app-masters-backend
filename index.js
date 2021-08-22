require('dotenv').config()
const express = require('express')
const cors =  require('cors')
const app = express()
const PORT = 3000
// const router = require('./src/routes')

app.use(cors())
app.use(express.json())
app.use(require('./src/routes'))


app.listen(PORT, () => {
    console.log(`Server started in port:${PORT}`)
})
