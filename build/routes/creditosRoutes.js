"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const creditosController_1 = require("../controllers/creditosController");
const validarToken_1 = require("../middleware/validarToken");
class CreditosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", validarToken_1.verifyToken, creditosController_1.creditosController.list);
        this.router.get("/:id", validarToken_1.verifyToken, creditosController_1.creditosController.getCredito);
        this.router.get("/busqueda/:identidad", validarToken_1.verifyToken, creditosController_1.creditosController.getCreditoByIdentidad);
        this.router.get("/busquedaEstados/:estado", validarToken_1.verifyToken, creditosController_1.creditosController.getCreditoByEstado);
        this.router.post("/", validarToken_1.verifyToken, creditosController_1.creditosController.create);
        this.router.delete("/:id", validarToken_1.verifyToken, creditosController_1.creditosController.delete);
        this.router.put("/:id", validarToken_1.verifyToken, creditosController_1.creditosController.update);
    }
}
const creditosRoutes = new CreditosRoutes();
exports.default = creditosRoutes.router;
