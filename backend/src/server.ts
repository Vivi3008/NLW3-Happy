import express from 'express'

const app = express()

app.get('/', (req,res)=>{
    res.send('Hello typescript com node!')
})


app.listen(3333)