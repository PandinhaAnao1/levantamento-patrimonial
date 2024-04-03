import expres from "express";
const router = expres.Router()

router.get('/teste',(req,res)=>{
    res.send("Pegou as rotas")
})
export default router;