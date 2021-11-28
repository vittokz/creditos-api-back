"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pagosController_1 = require("../controllers/pagosController");
const validarToken_1 = require("../middleware/validarToken");
class PagosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", validarToken_1.verifyToken, pagosController_1.pagosController.list);
        this.router.get("/:idCredito", validarToken_1.verifyToken, pagosController_1.pagosController.getPagosByNumContrato);
        this.router.get("/mayorNumCuota/:idCredito", validarToken_1.verifyToken, pagosController_1.pagosController.getNumeroCuota);
        this.router.post("/", validarToken_1.verifyToken, pagosController_1.pagosController.create);
        this.router.post("/pagoNormal/", validarToken_1.verifyToken, pagosController_1.pagosController.createPagoNormal);
        this.router.post("/pagoProximasCuotas/", validarToken_1.verifyToken, pagosController_1.pagosController.createPagoNormal);
        this.router.delete("/:id", validarToken_1.verifyToken, pagosController_1.pagosController.delete);
    }
}
const pagosRoutes = new PagosRoutes();
exports.default = pagosRoutes.router;
