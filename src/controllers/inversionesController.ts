import { Request, Response, query } from "express";
import { transporter } from "../mailer";
import pool from "../database";

class InversionesController {
  //crear inversion
  public async create(req: Request, res: Response): Promise<void> {
    const resultado = await pool.query("INSERT INTO cred_inversiones set ?", [
      req.body,
    ]);
    if (resultado.affectedRows > 0) {
      // send mail with defined transport object
      await transporter.sendMail({
        from: '"Se registro solicitud de inversión" <informacion@credivadu.com>', // sender address
        to: `vittorio15@hotmail.com`, // list of receivers
        subject: "Se registro solicitud de inversión ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>  Información de la inversión :<br>
        Número de contrato:  ${req.body.numContrato} <br>
        Cedula del inversionista:  ${req.body.idInversionista} <br>
        Valor invertido:  ${req.body.valorInvertido} <br>
        </b>`, // html body
      });
      res.json({
        estado: "ok",
        message: "Inversion Guardada con exito",
      });
    } else {
      res.json({
        estado: "error",
        message: "No se registro inversion",
      });
    }
  }
  //traer inversiones  por inumContrato
  public async getInversionesByIdSolicitud(
    req: Request,
    res: Response
  ): Promise<any> {
    const { idSolicitud } = req.params;
    const inversiones = await pool.query(
      "SELECT * FROM cred_inversiones where numContrato = ? order by fechaInversion DESC",
      [idSolicitud]
    );
    if (inversiones.length > 0) {
      const sumaInversion = await pool.query(
        "SELECT sum(valorInvertido) as suma FROM cred_inversiones where numContrato = ? order by fechaInversion DESC",
        [idSolicitud]
      );
      return res.json({
        sumaInversion: sumaInversion[0],
        data: inversiones,
      });
    }
    res
      .status(404)
      .json({ estado: "error", message: "idSolicitud no tienes inversiones" });
  }

  //traer inversiones  por identidad del inversionista

  public async getInversionesByIdInversionista(
    req: Request,
    res: Response
  ): Promise<any> {
    const { idInversionista } = req.params;
    const inversiones = await pool.query(
      "SELECT * FROM cred_inversiones where idInversionista = ? order by fechaInversion DESC",
      [idInversionista]
    );
    if (inversiones.length > 0) {
      return res.json({ estado: "ok", data: inversiones });
    }
    res
      .status(404)
      .json({ message: "Identidad inversionista no tienes inversiones" });
  }
}

export const inversionesController = new InversionesController();
