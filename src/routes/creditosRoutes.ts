import { Router } from "express";
import { creditosController } from "../controllers/creditosController";
import { verifyToken } from "../middleware/validarToken";
class CreditosRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get("/", verifyToken, creditosController.list);
    this.router.get("/:id", verifyToken, creditosController.getCredito);
    this.router.get(
      "/busqueda/:identidad",
      verifyToken,
      creditosController.getCreditoByIdentidad
    );
    this.router.get(
      "/busquedaEstados/:estado",
      verifyToken,
      creditosController.getCreditoByEstado
    );

    this.router.post("/", verifyToken, creditosController.create);
    this.router.delete("/:id", verifyToken, creditosController.delete);
    this.router.put("/:id", verifyToken, creditosController.update);
  }
}

const creditosRoutes = new CreditosRoutes();
export default creditosRoutes.router;
