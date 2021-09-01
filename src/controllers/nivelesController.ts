import { Request, Response, query } from "express";

import pool from "../database";

class NivelesController {
  //trae todos los niveles
  public async list(req: Request, res: Response) {
    const niveles = await pool.query("SELECT * FROM prueba");
    res.json(niveles);
  }

  //agregar persona a nivel 1
  public async createNivel1(req: Request, res: Response): Promise<void> {
    var idAsignacionPlan = req.body["idAsignacionPlan"];
    var idClienteAgregado = req.body["idClienteAgregado"];
    var usuarioRegistro = req.body["usuarioRegistro"];

    var dataAsignar = {
      idCliente: idClienteAgregado,
      idPlan: "1",
      idAsignacionPlan: idAsignacionPlan,
      estado: "Activo",
      usuarioAsigno: usuarioRegistro,
    };

    const resp = await pool.query(
      "SELECT * FROM tb_tabla_personas_nivel1 where idAsignacionPlan = ? and idClienteAgregado = ?",
      [idAsignacionPlan, idClienteAgregado]
    );

    if (resp.length <= 0) {
      const resp2 = await pool.query(
        "SELECT * FROM tb_tabla_personas_nivel1 where idAsignacionPlan = ?",
        [idAsignacionPlan]
      );
      if (resp2.length < 3) {
        await pool.query("INSERT INTO tb_tabla_personas_nivel1 set ?", [
          req.body,
        ]);
        await pool.query("INSERT INTO tb_asignar_plan set ?", [dataAsignar]);
        res.json({
          message: "Persona asignada con exito en nivel 1 y con plan creado.",
          idError: 0,
        });
      } else {
        res.json({
          message: "Ya tiene 3 personas en el nivel",
          idError: 1,
        });
      }
    } else {
      res.json({
        message: "Persona ya esta asignado al plan",
        idError: 2,
      });
    }
  }
}

export const nivelesController = new NivelesController();
