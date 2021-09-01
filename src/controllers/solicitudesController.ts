import { Request, Response, query } from "express";

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
  //crear una solicitud
  public async create(req: Request, res: Response): Promise<void> {
    await pool.query("INSERT INTO cred_solicitudes set ?", [req.body]);
    res.json({
      message: "Solicitud Guardada con exito",
    });
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
    await pool.query("UPDATE cred_solicitude set id = ?", [req.body, id]);
    res.json({ message: "solicitud fue actualizado" });
  }

  ///operaciones estados de la solicitud de credito
  //crear un cambio de estado de la solicitud
  public async createEstadoSolicitud(
    req: Request,
    res: Response
  ): Promise<void> {
    await pool.query("INSERT INTO cred_solicitud_estados_credito set ?", [
      req.body,
    ]);
    res.json({
      esdado: "ok",
      datos: req.body,
      message: "Solicitud de estado Guardada con exito",
    });
  }
  public async getEstadoSolicitudById(
    req: Request,
    res: Response
  ): Promise<any> {
    const { id } = req.params;
    const estadosSolicitud = await pool.query(
      "SELECT * FROM cred_solicitud_estados_credito where idSolicitud = ?",
      [id]
    );
    if (estadosSolicitud.length > 0) {
      return res.json(estadosSolicitud);
    }
    res.status(404).json({ message: "Id SOlicitud no existe" });
  }
}

export const solicitudesController = new SolicitudesController();
