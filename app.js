const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb+srv://bouteille:<LJk8rHH2pZ46HN15>@qwesttv-test.yznnj.mongodb.net/<QwestTV-test>?retryWrites=true&w=majority'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', => {
    console.log('connected')
})

const userRouter = require('../routes/users')
app.use('/users',userRouter)

app.listen(9000, => {
    console.log('server started')
})