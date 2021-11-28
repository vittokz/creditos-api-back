import { Request, Response, query } from "express";

import pool from "../database";

class PagosController {
  public async list(req: Request, res: Response) {
    const pagos = await pool.query(
      "SELECT * FROM cred_pagos WHERE estado like 'Activo' order by fechaRegistro DESC"
    );
    res.json(pagos);
  }

  public async getPagosByNumContrato(
    req: Request,
    res: Response
  ): Promise<any> {
    const { idCredito } = req.params;
    const pagos = await pool.query(
      "SELECT * FROM cred_pagos where idCredito = ?",
      [idCredito]
    );
    if (pagos.length > 0) {
      return res.json(pagos);
    } else {
      res.json({ message: "numContrato no tiene pagos" });
    }
  }

  //get mayor numero de cuota
  public async getNumeroCuota(req: Request, res: Response): Promise<any> {
    const { idCredito } = req.params;
    const pagos = await pool.query(
      "SELECT * FROM cred_pagos where idCredito = ? order by fechaRegistro DESC limit 1",
      [idCredito]
    );
    if (pagos.length > 0) {
      return res.json(pagos[0]);
    } else {
      res.json({ message: "numContrato no tiene pagos" });
    }
  }

  //crear un pago
  public async create(req: Request, res: Response): Promise<void> {
    await pool.query("INSERT INTO cred_pagos set ?", [req.body]);

    res.json({
      estado: "ok",
      credito: req.body,
      message: "Pago guardado",
    });
  }

  //crear pago nomral credito
  public async createPagoNormal(req: Request, res: Response): Promise<void> {
    req.body;
    /*   await pool.query("INSERT INTO cred_pagos set ?", [req.body]);

    res.json({
      estado: "ok",
      credito: req.body,
      message: "Pago guardado",
    }); */
  }
  //crear pago nomral credito
  public async createPagoProximasCuotas(
    req: Request,
    res: Response
  ): Promise<void> {
    console.log(req.body);
  }
  //eliminar un pago
  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query("DELETE FROM cred_pagos WHERE idCredito = ?", [id]);
    res.json({ message: "Pago fue eliminado" });
  }
}

export const pagosController = new PagosController();
