"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solicitudesController = void 0;
const database_1 = __importDefault(require("../database"));
class SolicitudesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const solicitudes = yield database_1.default.query("SELECT * FROM cred_solicitudes order by fechaRegistro DESC");
            res.json(solicitudes);
        });
    }
    getSolicitud(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const solicitud = yield database_1.default.query("SELECT * FROM cred_solicitudes where idSolicitud = ?", [id]);
            if (solicitud.length > 0) {
                return res.json(solicitud);
            }
            res.status(404).json({ message: "Identidad no existe" });
        });
    }
    //crear una solicitud
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("INSERT INTO cred_solicitudes set ?", [req.body]);
            res.json({
                message: "Solicitud Guardada con exito",
            });
        });
    }
    //eliminar una solicitud
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("DELETE FROM ccred_solicitude WHERE idSolicitud = ?", [
                id,
            ]);
            res.json({ message: "solicitud fue eliminado" });
        });
    }
    //actualizar una solicitud
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("UPDATE cred_solicitude set id = ?", [req.body, id]);
            res.json({ message: "solicitud fue actualizado" });
        });
    }
    ///operaciones estados de la solicitud de credito
    //crear un cambio de estado de la solicitud
    createEstadoSolicitud(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("INSERT INTO cred_solicitud_estados_credito set ?", [
                req.body,
            ]);
            res.json({
                esdado: "ok",
                datos: req.body,
                message: "Solicitud de estado Guardada con exito",
            });
        });
    }
    getEstadoSolicitudById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const estadosSolicitud = yield database_1.default.query("SELECT * FROM cred_solicitud_estados_credito where idSolicitud = ?", [id]);
            if (estadosSolicitud.length > 0) {
                return res.json(estadosSolicitud);
            }
            res.status(404).json({ message: "Id SOlicitud no existe" });
        });
    }
}
exports.solicitudesController = new SolicitudesController();
