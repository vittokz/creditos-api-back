import { Router} from 'express';
import { authController } from '../controllers/authController'

class AuthRoutes {
    
    public router : Router = Router();
    
    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/:id/:pw', authController.validar); 
        this.router.get('/:id', authController.getTipoUsuario); 
    }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;
