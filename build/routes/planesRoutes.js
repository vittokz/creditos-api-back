"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const planesController_1 = require("../controllers/planesController");
const validarToken_1 = require("../middleware/validarToken");
class PlanesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', validarToken_1.verifyToken, planesController_1.planesController.list);
        this.router.get('/asignaciones/:id', validarToken_1.verifyToken, planesController_1.planesController.getAsignaciones);
        this.router.get('/asignacionesByPlanNivel2/:id/:idPlan', validarToken_1.verifyToken, planesController_1.planesController.getAsignacionesByPlanNivel2);
        this.router.get('/asignacionesByPlan/:id/:idPlan', validarToken_1.verifyToken, planesController_1.planesController.getAsignacionesByPlan);
        this.router.get('/:id', validarToken_1.verifyToken, planesController_1.planesController.getPlan);
        this.router.post('/', validarToken_1.verifyToken, planesController_1.planesController.create);
        this.router.delete('/:id', validarToken_1.verifyToken, planesController_1.planesController.delete);
        this.router.put('/:id', validarToken_1.verifyToken, planesController_1.planesController.update);
    }
}
const planesRoutes = new PlanesRoutes();
exports.default = planesRoutes.router;
