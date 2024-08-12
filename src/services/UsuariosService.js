import UsuarioRepository from "../repositories/UsuarioRepository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UsuarioService{
    
    static async login(login){
        const PRIVATE_KEY = '1010FFF'

        const {email, senha} = login 

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if(!emailRegex.test(email) && senha == null || senha == undefined) return;
        
        try{
            const senhaHash = senha;
            //await bcrypt.hash(senha, 10);
            console.log(senhaHash)
            const usuario = await UsuarioRepository.login({email, senhaHash});
            console.log("Usuario: "+ usuario)
            if(usuario == null || usuario == undefined) throw new Error("Usuario não exite na base de dados!"); 
            const jwtConfig = {
                expiresIn: '4d',  
                algorithm: 'HS256', 
              };

            const token = jwt.sign({ data: {'_id': usuario.usua_id} }, PRIVATE_KEY, jwtConfig); 
            console.log("Token: "+token);
            console.log({
                'user':usuario,
                'token':token
            })
            return {
                'user':usuario,
                'token':token
            }
        }catch(error){
            console.log(error);
            return;
        }
    }
}

export default UsuarioService;