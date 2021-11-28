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
const mailer_1 = require("../mailer");
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
    //get solicitud por Identidad
    getSolicitudByIdentidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { identidad } = req.params;
            const solicitudes = yield database_1.default.query("SELECT * FROM cred_solicitudes where ccSolicitante = ? order by fechaRegistro DESC", [identidad]);
            if (solicitudes.length > 0) {
                return res.json(solicitudes);
            }
            res.status(404).json({ message: "Identidad no tienes solicitudes" });
        });
    }
    //get solicitud por tipo estado
    getSolicitudByEstado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { estado } = req.params;
            const solicitudes = yield database_1.default.query("SELECT * FROM cred_solicitudes where estado like ? order by fechaRegistro DESC", estado);
            if (solicitudes.length > 0) {
                return res.json(solicitudes);
            }
            res.status(404).json({ message: "no hay estados pendientes por invertir" });
        });
    }
    //crear una solicitud
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultado = yield database_1.default.query("INSERT INTO cred_solicitudes set ?", [
                req.body,
            ]);
            if (resultado.affectedRows > 0) {
                let emailUsuario = req.body.email;
                // send mail with defined transport object
                yield mailer_1.transporter.sendMail({
                    from: '"Se registro una solicitud de crédito" <informacion@credivadu.com>',
                    to: `vittorio15@hotmail.com,${emailUsuario}`,
                    subject: "Se registro una solicitud de crédito ✔",
                    text: "Hello world?",
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
            }
            else {
                res.json({
                    estado: "error",
                    message: "No se registro solicitud",
                });
            }
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
            yield database_1.default.query("UPDATE cred_solicitudes set id = ?", [req.body, id]);
            res.json({ message: "solicitud fue actualizado" });
        });
    }
    ///operaciones estados de la solicitud de credito
    //crear un cambio de estado de la solicitud
    createEstadoSolicitud(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var tipoEstado = req.body["tipoEstado"];
            var idSolicitud = req.body["idSolicitud"];
            if (tipoEstado == "5") {
                yield database_1.default.query("UPDATE cred_solicitudes set estado = ? where idSolicitud = ?", ["Cerrada", idSolicitud]);
            }
            yield database_1.default.query("INSERT INTO cred_solicitud_estados_credito set ?", [
                req.body,
            ]);
            res.json({
                estado: "ok",
                datos: req.body,
                message: "Solicitud de estado Guardada con exito",
            });
        });
    }
    //actualizar el estado de una solicitud y del credito
    updateEstadoSolicitud(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idSolicitud } = req.params;
            console.log("pruebas:", idSolicitud);
            yield database_1.default.query("UPDATE cred_solicitudes set estado = ? where idSolicitud = ?", ["Aceptada", idSolicitud]);
            yield database_1.default.query("UPDATE cred_credito set estado = ? where numContrato = ?", ["Activo", idSolicitud]);
            res.json({
                estado: "ok",
                message: "Solicitud de estado modificada con exito",
            });
        });
    }
    //traer estados de solicitud por estados
    getEstadoSolicitudById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const estadosSolicitud = yield database_1.default.query("SELECT * FROM cred_solicitud_estados_credito where idSolicitud = ? order by fechaRegistro DESC", [id]);
            if (estadosSolicitud.length > 0) {
                return res.json(estadosSolicitud);
            }
            res.status(404).json({ message: "Id SOlicitud no existe" });
        });
    }
}
exports.solicitudesController = new SolicitudesController();
