import { Request, Response } from "express";

class NotificacionController {
  public enviarNotificacion(req: Request, res: Response) {
    res.json({
      text: "Api esta en /api/creditos",
    });
  }
}

export const notificacionController = new NotificacionController();
