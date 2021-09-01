import { Request, Response, query } from "express";
import conexion from "../database";
const jwt = require("jsonwebtoken");

class AuthController {
  //validar inicio de session
  public async validar(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const { pw } = req.params;

    const data = await conexion.query(
      'SELECT * FROM cred_usuario where identidad = ? and password = ? and estado like "Activo"',
      [id, pw]
    );
    if (data.length > 0) {
      const token = jwt.sign({ user: data }, "secretkey");
      return res.json({
        token: token,
        acceso: data,
        idError: 1,
      });
    }
    return res.json({
      message: "El usuario no existe",
      idError: 0,
    });
  }

  //recuperar tipo de usuario registrado
  public async getTipoUsuario(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const tipoUsuario = await conexion.query(
      "SELECT tipoUsuario FROM tb_usuario where identidad = ?",
      [id]
    );
    if (tipoUsuario.length > 0) {
      return res.json(tipoUsuario);
    }
    return res.json({
      message: "No existe tipo de usuario",
      idError: 0,
    });
  }
}

export const authController = new AuthController();
