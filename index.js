import Express from "express";
import routes from "./src/routes/index.js";
const app = Express();


routes(app)

app.listen(3000,()=>{
    console.log("Ovindo na porta 3000")
})