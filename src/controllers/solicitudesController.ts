import { Request, Response, query } from "express";
import { transporter } from "../mailer";
import pool from "../database";

class SolicitudesController {
  public async list(req: Request, res: Response) {
    const solicitudes = await pool.query(
      "SELECT * FROM cred_solicitudes order by fechaRegistro DESC"
    );
    res.json(solicitudes);
  }

  public async getSolicitud(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const solicitud = await pool.query(
      "SELECT * FROM cred_solicitudes where idSolicitud = ?",
      [id]
    );
    if (solicitud.length > 0) {
      return res.json(solicitud);
    }
    res.status(404).json({ message: "Identidad no existe" });
  }
  //get solicitud por Identidad
  public async getSolicitudByIdentidad(
    req: Request,
    res: Response
  ): Promise<any> {
    const { identidad } = req.params;
    const solicitudes = await pool.query(
      "SELECT * FROM cred_solicitudes where ccSolicitante = ? order by fechaRegistro DESC",
      [identidad]
    );
    if (solicitudes.length > 0) {
      return res.json(solicitudes);
    }
    res.status(404).json({ message: "Identidad no tienes solicitudes" });
  }

  //get solicitud por tipo estado
  public async getSolicitudByEstado(req: Request, res: Response): Promise<any> {
    const { estado } = req.params;
    const solicitudes = await pool.query(
      "SELECT * FROM cred_solicitudes where estado like ? order by fechaRegistro DESC",
      estado
    );
    if (solicitudes.length > 0) {
      return res.json(solicitudes);
    }
    res.status(404).json({ message: "no hay estados pendientes por invertir" });
  }
  //crear una solicitud
  public async create(req: Request, res: Response): Promise<void> {
    const resultado = await pool.query("INSERT INTO cred_solicitudes set ?", [
      req.body,
    ]);

    if (resultado.affectedRows > 0) {
      let emailUsuario = req.body.email;
      // send mail with defined transport object
      await transporter.sendMail({
        from: '"Se registro una solicitud de crédito" <informacion@credivadu.com>', // sender address
        to: `vittorio15@hotmail.com,${emailUsuario}`, // list of receivers
        subject: "Se registro una solicitud de crédito ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>  Información de la solicitud :<br>
        Tipo Documento:  ${req.body.tipoDoc} <br>
        Cedula del solicitante:  ${req.body.ccSolicitante} <br>
        Nombres del solicitante:  ${req.body.nombreSolicitante} <br>
        Apellidos del solicitante:  ${req.body.apellidoSolicitante} <br>
        Email:  ${req.body.email} <br>
        Celular: ${req.body.celular} <br>
        Municipio del solicitante:  ${req.body.municipioSolicitante} <br>
        Valor del crédito:  ${req.body.valorCredito} <br>
        Plazo:  ${req.body.plazo} <br>
        Tipo crédito:  ${req.body.tipoCredito} <br>
        Valor cuota:  ${req.body.valorCuota} <br>
        Tipo interes:  ${req.body.tipoInteres} <br>
        Numero de registro del predio:  ${req.body.numRegistroPredio} <br>
        Municipio donde se encuentra en predio:  ${req.body.municipioLyT} <br>

        </b>`, // html body
      });
      res.json({
        estado: "ok",
        message: "Solicitud Guardada con exito",
      });
    } else {
      res.json({
        estado: "error",
        message: "No se registro solicitud",
      });
    }
  }
  //eliminar una solicitud
  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query("DELETE FROM ccred_solicitude WHERE idSolicitud = ?", [
      id,
    ]);
    res.json({ message: "solicitud fue eliminado" });
  }

  //actualizar una solicitud
  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query("UPDATE cred_solicitudes set id = ?", [req.body, id]);
    res.json({ message: "solicitud fue actualizado" });
  }

  ///operaciones estados de la solicitud de credito
  //crear un cambio de estado de la solicitud
  public async createEstadoSolicitud(
    req: Request,
    res: Response
  ): Promise<void> {
    var tipoEstado = req.body["tipoEstado"];
    var idSolicitud = req.body["idSolicitud"];

    if (tipoEstado == "5") {
      await pool.query(
        "UPDATE cred_solicitudes set estado = ? where idSolicitud = ?",
        ["Cerrada", idSolicitud]
      );
    }
    await pool.query("INSERT INTO cred_solicitud_estados_credito set ?", [
      req.body,
    ]);

    res.json({
      estado: "ok",
      datos: req.body,
      message: "Solicitud de estado Guardada con exito",
    });
  }
  //actualizar el estado de una solicitud y del credito
  public async updateEstadoSolicitud(
    req: Request,
    res: Response
  ): Promise<void> {
    const { idSolicitud } = req.params;
    console.log("pruebas:", idSolicitud);
    await pool.query(
      "UPDATE cred_solicitudes set estado = ? where idSolicitud = ?",
      ["Aceptada", idSolicitud]
    );
    await pool.query(
      "UPDATE cred_credito set estado = ? where numContrato = ?",
      ["Activo", idSolicitud]
    );

    res.json({
      estado: "ok",
      message: "Solicitud de estado modificada con exito",
    });
  }

  //traer estados de solicitud por estados
  public async getEstadoSolicitudById(
    req: Request,
    res: Response
  ): Promise<any> {
    const { id } = req.params;
    const estadosSolicitud = await pool.query(
      "SELECT * FROM cred_solicitud_estados_credito where idSolicitud = ? order by fechaRegistro DESC",
      [id]
    );
    if (estadosSolicitud.length > 0) {
      return res.json(estadosSolicitud);
    }
    res.status(404).json({ message: "Id SOlicitud no existe" });
  }
}

export const solicitudesController = new SolicitudesController();
