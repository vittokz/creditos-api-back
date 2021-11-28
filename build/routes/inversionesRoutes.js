"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middleware/validarToken");
const inversionesController_1 = require("../controllers/inversionesController");
class InversionesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post("/", validarToken_1.verifyToken, inversionesController_1.inversionesController.create);
        this.router.get("/byIdSolicitud/:idSolicitud", validarToken_1.verifyToken, inversionesController_1.inversionesController.getInversionesByIdSolicitud);
        this.router.get("/byIdInversionista/:idInversionista", validarToken_1.verifyToken, inversionesController_1.inversionesController.getInversionesByIdInversionista);
    }
}
const inversionesRoutes = new InversionesRoutes();
exports.default = inversionesRoutes.router;
