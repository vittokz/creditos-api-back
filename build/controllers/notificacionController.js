"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificacionController = void 0;
class NotificacionController {
    enviarNotificacion(req, res) {
        res.json({
            text: "Api esta en /api/creditos",
        });
    }
}
exports.notificacionController = new NotificacionController();
