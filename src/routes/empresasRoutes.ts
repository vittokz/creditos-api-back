import { Router} from 'express';
import { empresasController } from '../controllers/empresasController'
import {verifyToken} from '../middleware/validarToken';
class EmpresasRoutes {
    
    public router : Router = Router();
    
    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', verifyToken, empresasController.list);
        this.router.get('/:id', verifyToken, empresasController.getEmpresa);
        this.router.post('/', verifyToken, empresasController.create); 
        this.router.delete('/:id', verifyToken, empresasController.delete); 
        this.router.put('/:id', verifyToken, empresasController.update); 
    }
}

const empresasRoutes = new EmpresasRoutes();
export default empresasRoutes.router;
