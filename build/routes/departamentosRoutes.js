"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const departamentoController_1 = require("../controllers/departamentoController");
const validarToken_1 = require("../middleware/validarToken");
class DepartamentosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/", validarToken_1.verifyToken, departamentoController_1.departamentosController.listDepartamentos);
        this.router.get("/:id", validarToken_1.verifyToken, departamentoController_1.departamentosController.getDeparId);
        this.router.get("/municipios/:id", validarToken_1.verifyToken, departamentoController_1.departamentosController.getMunicipiosPorIdDep);
    }
}
const departamentosRoutes = new DepartamentosRoutes();
exports.default = departamentosRoutes.router;
