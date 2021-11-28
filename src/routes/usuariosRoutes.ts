import { Router } from "express";
import { usuariosController } from "../controllers/usuariosController";
import { verifyToken } from "../middleware/validarToken";
class UsuariosRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get("/", verifyToken, usuariosController.list);

    this.router.get(
      "/usuarioByTipoUsuario/:tipo",
      verifyToken,
      usuariosController.getUsuarioByTipo
    );
    this.router.get(
      "/usuarioByTipoUsuarioDiferenteAdmin/:tipo",
      verifyToken,
      usuariosController.getUsuarioByDiferenteAdmin
    );
    this.router.get(
      "/usuarioByIdentidad/:identidad",
      verifyToken,
      usuariosController.getUsuarioByIdentidad
    );
    this.router.get(
      "/usuarioForget/:email",

      usuariosController.getUsuarioForget
    );
    this.router.post("/", verifyToken, usuariosController.create);
    this.router.delete("/:id", verifyToken, usuariosController.delete);
    this.router.put("/:id", verifyToken, usuariosController.update);
  }
}

const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;
