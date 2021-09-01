import { Router } from "express";
import { verifyToken } from "../middleware/validarToken";
import { nivelesController } from "../controllers/nivelesController";
class NivelesRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get("/", verifyToken, nivelesController.list);
    this.router.post("/addNivel1", verifyToken, nivelesController.createNivel1);
  }
}

const nivelesRoutes = new NivelesRoutes();
export default nivelesRoutes.router;
