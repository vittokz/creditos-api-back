"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
const validarToken_1 = require("../middleware/validarToken");
class UsuariosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/", validarToken_1.verifyToken, usuariosController_1.usuariosController.list);
        this.router.get("/usuarioByTipoUsuario/:tipo", validarToken_1.verifyToken, usuariosController_1.usuariosController.getUsuarioByTipo);
        this.router.get("/usuarioByIdentidad/:identidad", validarToken_1.verifyToken, usuariosController_1.usuariosController.getUsuarioByIdentidad);
        this.router.post("/", validarToken_1.verifyToken, usuariosController_1.usuariosController.create);
        this.router.delete("/:id", validarToken_1.verifyToken, usuariosController_1.usuariosController.delete);
        this.router.put("/:id", validarToken_1.verifyToken, usuariosController_1.usuariosController.update);
    }
}
const usuariosRoutes = new UsuariosRoutes();
exports.default = usuariosRoutes.router;
