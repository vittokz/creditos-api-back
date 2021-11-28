import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
//const webpush = require("webpush");

import indexRoutes from "./routes/indexRoutes";
import creditosRoutes from "./routes/creditosRoutes";
import departamentosRoutes from "./routes/departamentosRoutes";
import pagosRoutes from "./routes/pagosRoutes";
import solicitudesRoutes from "./routes/solicitudesRoutes";
import usuariosRoutes from "./routes/usuariosRoutes";
import authRoutes from "./routes/authRoutes";
import inversionesRoutes from "./routes/inversionesRoutes";
import notificacionRoutes from "./routes/notificacionRoutes";

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    this.app.set("port", process.env.PORT || 3000);
    this.app.use(morgan("dev")); //ver peticiones de clientes
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes(): void {
    this.app.use("/", indexRoutes);
    this.app.use("/api/creditos", creditosRoutes);
    this.app.use("/api/pagos", pagosRoutes);
    this.app.use("/api/inversiones", inversionesRoutes);
    this.app.use("/api/departamentos", departamentosRoutes);
    this.app.use("/api/solicitudes", solicitudesRoutes);
    this.app.use("/api/usuarios", usuariosRoutes);
    this.app.use("/api/auth", authRoutes);
    this.app.use("/api/notificacion", notificacionRoutes);
  }

  start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("Servidor desde " + this.app.get("port"));
    });
  }
}

const server = new Server();
server.start();
