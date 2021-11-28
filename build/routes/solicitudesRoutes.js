"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const solicitudesController_1 = require("../controllers/solicitudesController");
const validarToken_1 = require("../middleware/validarToken");
class SolicitudesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", validarToken_1.verifyToken, solicitudesController_1.solicitudesController.list);
        this.router.get("/:id", validarToken_1.verifyToken, solicitudesController_1.solicitudesController.getSolicitud);
        this.router.get("/byIdentidad/:identidad", validarToken_1.verifyToken, solicitudesController_1.solicitudesController.getSolicitudByIdentidad);
        this.router.get("/byEstado/:estado", validarToken_1.verifyToken, solicitudesController_1.solicitudesController.getSolicitudByEstado);
        this.router.post("/", validarToken_1.verifyToken, solicitudesController_1.solicitudesController.create);
        this.router.put("/:id", validarToken_1.verifyToken, solicitudesController_1.solicitudesController.update);
        this.router.post("/solicitudEstados/", validarToken_1.verifyToken, solicitudesController_1.solicitudesController.createEstadoSolicitud);
        this.router.get("/updateEstados/:idSolicitud", validarToken_1.verifyToken, solicitudesController_1.solicitudesController.updateEstadoSolicitud);
        this.router.get("/solicitudEstados/:id", validarToken_1.verifyToken, solicitudesController_1.solicitudesController.getEstadoSolicitudById);
    }
}
const solicitudesRoutes = new SolicitudesRoutes();
exports.default = solicitudesRoutes.router;
