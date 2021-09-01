"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const solicitudesController_1 = require("../controllers/solicitudesController");
const validarToken_1 = require("../middleware/validarToken");
class SolicitudesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/", validarToken_1.verifyToken, solicitudesController_1.solicitudesController.list);
        this.router.get("/:id", validarToken_1.verifyToken, solicitudesController_1.solicitudesController.getSolicitud);
        this.router.post("/", validarToken_1.verifyToken, solicitudesController_1.solicitudesController.create);
        this.router.put("/:id", validarToken_1.verifyToken, solicitudesController_1.solicitudesController.update);
        this.router.post("/solicitudEstados/", validarToken_1.verifyToken, solicitudesController_1.solicitudesController.createEstadoSolicitud);
        this.router.get("/solicitudEstados/:id", validarToken_1.verifyToken, solicitudesController_1.solicitudesController.getEstadoSolicitudById);
    }
}
const solicitudesRoutes = new SolicitudesRoutes();
exports.default = solicitudesRoutes.router;
