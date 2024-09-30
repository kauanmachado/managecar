const express = require('express')
const app = express()
const cors = require('cors')
const port = 9090
const user = require('./routes/user')
const car = require('./routes/car')
const path = require('path')

app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, './uploads')))
app.use(express.json())
app.use('/users', user)
app.use('/cars', car)

app.listen(port, () => { console.log('Servidor rodando na porta ', port)})