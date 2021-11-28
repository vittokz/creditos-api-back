"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notificacionController_1 = require("../controllers/notificacionController");
const validarToken_1 = require("../middleware/validarToken");
class NotificacionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post("/", validarToken_1.verifyToken, notificacionController_1.notificacionController.enviarNotificacion);
    }
}
const notificacionRoutes = new NotificacionRoutes();
exports.default = notificacionRoutes.router;
