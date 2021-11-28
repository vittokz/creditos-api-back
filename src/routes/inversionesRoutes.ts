import { Router } from "express";
import { verifyToken } from "../middleware/validarToken";
import { inversionesController } from "../controllers/inversionesController";
class InversionesRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.post("/", verifyToken, inversionesController.create);
    this.router.get(
      "/byIdSolicitud/:idSolicitud",
      verifyToken,
      inversionesController.getInversionesByIdSolicitud
    );
    this.router.get(
      "/byIdInversionista/:idInversionista",
      verifyToken,
      inversionesController.getInversionesByIdInversionista
    );
  }
}

const inversionesRoutes = new InversionesRoutes();
export default inversionesRoutes.router;
