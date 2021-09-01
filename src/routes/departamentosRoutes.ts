import { Handler, Router } from "express";
import { departamentosController } from "../controllers/departamentoController";
import { verifyToken } from "../middleware/validarToken";
class DepartamentosRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get(
      "/",
      verifyToken,
      departamentosController.listDepartamentos
    );
    this.router.get("/:id", verifyToken, departamentosController.getDeparId);
    this.router.get(
      "/municipios/:id",
      verifyToken,
      departamentosController.getMunicipiosPorIdDep
    );
  }
}

const departamentosRoutes = new DepartamentosRoutes();
export default departamentosRoutes.router;
