import { Router } from "express";
import { pagosController } from "../controllers/pagosController";
import { verifyToken } from "../middleware/validarToken";
class PagosRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get("/", verifyToken, pagosController.list);
    this.router.get(
      "/:idCredito",
      verifyToken,
      pagosController.getPagosByNumContrato
    );
    this.router.get(
      "/mayorNumCuota/:idCredito",
      verifyToken,
      pagosController.getNumeroCuota
    );

    this.router.post("/", verifyToken, pagosController.create);
    this.router.post(
      "/pagoNormal/",
      verifyToken,
      pagosController.createPagoNormal
    );
    this.router.post(
      "/pagoProximasCuotas/",
      verifyToken,
      pagosController.createPagoNormal
    );
    this.router.delete("/:id", verifyToken, pagosController.delete);
  }
}

const pagosRoutes = new PagosRoutes();
export default pagosRoutes.router;
