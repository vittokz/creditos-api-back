"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
//const webpush = require("webpush");
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const creditosRoutes_1 = __importDefault(require("./routes/creditosRoutes"));
const departamentosRoutes_1 = __importDefault(require("./routes/departamentosRoutes"));
const pagosRoutes_1 = __importDefault(require("./routes/pagosRoutes"));
const solicitudesRoutes_1 = __importDefault(require("./routes/solicitudesRoutes"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const inversionesRoutes_1 = __importDefault(require("./routes/inversionesRoutes"));
const notificacionRoutes_1 = __importDefault(require("./routes/notificacionRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)("dev")); //ver peticiones de clientes
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    routes() {
        this.app.use("/", indexRoutes_1.default);
        this.app.use("/api/creditos", creditosRoutes_1.default);
        this.app.use("/api/pagos", pagosRoutes_1.default);
        this.app.use("/api/inversiones", inversionesRoutes_1.default);
        this.app.use("/api/departamentos", departamentosRoutes_1.default);
        this.app.use("/api/solicitudes", solicitudesRoutes_1.default);
        this.app.use("/api/usuarios", usuariosRoutes_1.default);
        this.app.use("/api/auth", authRoutes_1.default);
        this.app.use("/api/notificacion", notificacionRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get("port"), () => {
            console.log("Servidor desde " + this.app.get("port"));
        });
    }
}
const server = new Server();
server.start();
