import expres from "express";
const route = expres.Router()

route.get('/',(req,res)=>{
    res.send("Pegou as rotas")
})
export default route;