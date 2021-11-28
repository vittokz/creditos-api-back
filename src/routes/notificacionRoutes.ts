import { Router } from "express";
import { notificacionController } from "../controllers/notificacionController";

import { verifyToken } from "../middleware/validarToken";
class NotificacionRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.post(
      "/",
      verifyToken,
      notificacionController.enviarNotificacion
    );
  }
}

const notificacionRoutes = new NotificacionRoutes();
export default notificacionRoutes.router;
