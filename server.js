import app from './src/app.js'
import dotenv from 'dotenv'
dotenv.config()

app.listen(process.env.PORT || 3000,()=>{
    console.log("Ovindo na porta 3000")
})