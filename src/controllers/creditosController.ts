import { Request, Response, query } from "express";

import pool from "../database";

class CreditosController {
  public async list(req: Request, res: Response) {
    const creditos = await pool.query(
      "SELECT * FROM cred_credito WHERE estado like 'Activo' order by fechaRegistro DESC"
    );
    res.json(creditos);
  }

  public async getCredito(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    console.log("id", id);
    const credito = await pool.query(
      "SELECT * FROM cred_credito where numContrato = ?",
      [id]
    );
    if (credito.length > 0) {
      return res.json(credito[0]);
    }
    res.status(404).json({ message: "Credito no existe" });
  }
  //traer creditos por identidad del cliente
  public async getCreditoByIdentidad(
    req: Request,
    res: Response
  ): Promise<any> {
    const { identidad } = req.params;
    const creditos = await pool.query(
      "SELECT * FROM cred_credito where idCliente = ? and estado like 'Activo'",
      [identidad]
    );
    if (creditos.length > 0) {
      return res.json(creditos);
    }
    res.status(404).json({ message: "Identidad no tiene creditos" });
  }
  //traer creditos con estado por invertir
  public async getCreditoByEstado(req: Request, res: Response): Promise<any> {
    const { estado } = req.params;
    const creditos = await pool.query(
      "SELECT * FROM cred_credito where estado = ?",
      [estado]
    );
    if (creditos.length > 0) {
      return res.json(creditos);
    }
    res
      .status(404)
      .json({ message: "Identidad no tiene creditos por invertir" });
  }
  //crear un credito
  public async create(req: Request, res: Response): Promise<void> {
    await pool.query("INSERT INTO cred_credito set ?", [req.body]);
    res.json({
      estado: "ok",
      credito: req.body,
      message: "Credito Guardada",
    });
  }
  //eliminar una credito
  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query("DELETE FROM cred_credito WHERE idCredito = ?", [id]);
    res.json({ message: "Credito fue eliminado" });
  }

  //actualizar un credito
  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query("UPDATE cred_credito set id = ?", [req.body, id]);
    res.json({ estado: "ok", message: "Credito fue actualizado" });
  }
}

export const creditosController = new CreditosController();
