import { Router} from 'express';
import { planesController } from '../controllers/planesController'
import {verifyToken} from '../middleware/validarToken';
class PlanesRoutes {
    
    public router : Router = Router();
    
    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', verifyToken, planesController.list);
        this.router.get('/asignaciones/:id', verifyToken, planesController.getAsignaciones);
        this.router.get('/asignacionesByPlanNivel2/:id/:idPlan', verifyToken, planesController.getAsignacionesByPlanNivel2);
        this.router.get('/asignacionesByPlan/:id/:idPlan', verifyToken, planesController.getAsignacionesByPlan);
        this.router.get('/:id', verifyToken, planesController.getPlan);
        this.router.post('/', verifyToken, planesController.create); 
        this.router.delete('/:id', verifyToken, planesController.delete); 
        this.router.put('/:id', verifyToken, planesController.update); 
    }
}

const planesRoutes = new PlanesRoutes();
export default planesRoutes.router;
