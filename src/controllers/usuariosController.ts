import { Request, Response, query } from "express";
const bcrypt = require("bcrypt");
import pool from "../database";
import { transporter } from "../mailer";
class UsuariosController {
  public async list(req: Request, res: Response) {
    const usuarios = await pool.query(
      "SELECT * FROM cred_usuario order by identidad ASC"
    );
    res.json(usuarios);
  }

  //recoger usuario por tipo
  public async getUsuarioByTipo(req: Request, res: Response): Promise<any> {
    const { tipo } = req.params;
    const usuarios = await pool.query(
      "SELECT * FROM cred_usuario where tipoUsuario <> ?",
      [tipo]
    );
    if (usuarios.length > 0) {
      return res.json(usuarios);
    }
    res.status(404).json({ message: "No existen usuarios" });
  }

  //recoger usuario diferentes a administrador
  public async getUsuarioByDiferenteAdmin(
    req: Request,
    res: Response
  ): Promise<any> {
    const { tipo } = req.params;
    const usuarios = await pool.query(
      "SELECT * FROM cred_usuario where tipoUsuario like ?",
      [tipo]
    );
    if (usuarios.length > 0) {
      return res.json(usuarios);
    }
    res.status(404).json({ message: "No existen usuarios" });
  }

  //recuperar contraseña
  public async getUsuarioForget(req: Request, res: Response): Promise<void> {
    const { email } = req.params;
    const usuarioDatos = await pool.query(
      "SELECT * FROM cred_usuario where email like ?",
      [email]
    );
    if (usuarioDatos.length > 0) {
      // send mail with defined transport object
      await transporter.sendMail({
        from: '"Solicitud recuperación de contraseña" <informacion@credivadu.com>', // sender address
        to: "vittorio15@hotmail.com", // list of receivers
        subject: "Se registro solicitud ✔", // Subject line
        text: "hola", // plain text body
        html: `<b>  Información de Acceso al sistema Credivadu :<br>
        Nombres y apellidos:  ${usuarioDatos[0].nombre}  ${usuarioDatos[0].apellido} <br>
        Password:  ${usuarioDatos[0].password} <br>
        Gracias, <br>
        </b>`, // html body
      });
      res.json({
        estado: "ok",
        message: "Email enviado con exito",
      });
    } else {
      res
        .status(404)
        .json({ message: "No existe usuario con el email solicitado" });
    }
  }

  //recoger usuario por identidad
  public async getUsuarioByIdentidad(
    req: Request,
    res: Response
  ): Promise<any> {
    const { identidad } = req.params;
    const usuarioDatos = await pool.query(
      "SELECT * FROM cred_usuario where identidad like ?",
      [identidad]
    );
    if (usuarioDatos.length > 0) {
      return res.json(usuarioDatos);
    }
    res
      .status(404)
      .json({ message: "No existe usuario con la identidad enviada" });
  }

  //crear un usuarios
  public async create(req: Request, res: Response): Promise<void> {
    /*  let password = req.body.password;
         bcrypt.hash(password, 10,function(err: any, hash: any){
            req.body.password = hash;
         }); */
    console.log(req.body);
    await pool.query("INSERT INTO cred_usuario set ?", [req.body]);
    res.json({
      message: "Usuario Guardado con exito",
    });
    // res.status(404).json({ message : 'Error registrando usuario'});
  }
  //eliminar un usuarios
  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query("DELETE FROM cred_usuario WHERE idUsuario = ?", [id]);
    res.json({ message: "Usuario fue eliminado" });
  }

  //actualizar un usuario
  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query("UPDATE cred_usuario set ? WHERE identidad = ?", [
      req.body,
      id,
    ]);
    res.json({
      estado: "ok",
      message: "Usuario fue actualizado",
    });
  }
}

export const usuariosController = new UsuariosController();
