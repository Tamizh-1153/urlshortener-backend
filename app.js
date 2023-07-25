const express=require('express')
const app = express()
require('dotenv').config()
const cors=require('cors')

const connectDB=require('./db/connectDB')
const authenticateUser=require('./middleware/authentication')

const userRouter=require('./routes/user')
const shortUrlRouter=require('./routes/shortUrl')

app.use(express.json())
app.use(cors())
app.use('/api/v1',userRouter)
app.use('/',authenticateUser,shortUrlRouter)


const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(5010,()=>console.log('Server is listening on port 5000...'))
    }catch(err){
        console.log(err);
    }
}
start()

