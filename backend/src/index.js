const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const mongoDBCredentials = require('./credentials/mongodb.json')

const app = express()

mongoose.connect(`mongodb+srv://${mongoDBCredentials.admin}:${mongoDBCredentials.password}@cluster0-zo0yy.mongodb.net/radardev?retryWrites=true&w=majority`, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

app.use(cors())
app.use(express.json())
app.use(routes)


app.listen(3333)