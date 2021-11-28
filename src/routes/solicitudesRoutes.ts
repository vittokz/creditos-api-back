import { Router } from "express";
import { solicitudesController } from "../controllers/solicitudesController";
import { verifyToken } from "../middleware/validarToken";
class SolicitudesRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get("/", verifyToken, solicitudesController.list);
    this.router.get("/:id", verifyToken, solicitudesController.getSolicitud);
    this.router.get(
      "/byIdentidad/:identidad",
      verifyToken,
      solicitudesController.getSolicitudByIdentidad
    );
    this.router.get(
      "/byEstado/:estado",
      verifyToken,
      solicitudesController.getSolicitudByEstado
    );

    this.router.post("/", verifyToken, solicitudesController.create);
    this.router.put("/:id", verifyToken, solicitudesController.update);
    this.router.post(
      "/solicitudEstados/",
      verifyToken,
      solicitudesController.createEstadoSolicitud
    );
    this.router.get(
      "/updateEstados/:idSolicitud",
      verifyToken,
      solicitudesController.updateEstadoSolicitud
    );
    this.router.get(
      "/solicitudEstados/:id",
      verifyToken,
      solicitudesController.getEstadoSolicitudById
    );
  }
}

const solicitudesRoutes = new SolicitudesRoutes();
export default solicitudesRoutes.router;
