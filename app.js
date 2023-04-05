const express=require('express')

const app=express()
const port=process.env.PORT || 3000;


// Body-parser middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(express.static(__dirname+'/public'))


app.use('/api/entries',require('./routes/apiEntriesRoute'))
app.use('/api/authors', require('./routes/apiAuthorsRoute'))


app.listen(port,()=>{
    console.log(`servidor a la escucha del ${port}`)
})