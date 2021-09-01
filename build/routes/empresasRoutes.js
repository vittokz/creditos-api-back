"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const empresasController_1 = require("../controllers/empresasController");
const validarToken_1 = require("../middleware/validarToken");
class EmpresasRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', validarToken_1.verifyToken, empresasController_1.empresasController.list);
        this.router.get('/:id', validarToken_1.verifyToken, empresasController_1.empresasController.getEmpresa);
        this.router.post('/', validarToken_1.verifyToken, empresasController_1.empresasController.create);
        this.router.delete('/:id', validarToken_1.verifyToken, empresasController_1.empresasController.delete);
        this.router.put('/:id', validarToken_1.verifyToken, empresasController_1.empresasController.update);
    }
}
const empresasRoutes = new EmpresasRoutes();
exports.default = empresasRoutes.router;
