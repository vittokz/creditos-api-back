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
exports.inversionesController = void 0;
const mailer_1 = require("../mailer");
const database_1 = __importDefault(require("../database"));
class InversionesController {
    //crear inversion
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultado = yield database_1.default.query("INSERT INTO cred_inversiones set ?", [
                req.body,
            ]);
            if (resultado.affectedRows > 0) {
                // send mail with defined transport object
                yield mailer_1.transporter.sendMail({
                    from: '"Se registro solicitud de inversión" <informacion@credivadu.com>',
                    to: `vittorio15@hotmail.com`,
                    subject: "Se registro solicitud de inversión ✔",
                    text: "Hello world?",
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
            }
            else {
                res.json({
                    estado: "error",
                    message: "No se registro inversion",
                });
            }
        });
    }
    //traer inversiones  por inumContrato
    getInversionesByIdSolicitud(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idSolicitud } = req.params;
            const inversiones = yield database_1.default.query("SELECT * FROM cred_inversiones where numContrato = ? order by fechaInversion DESC", [idSolicitud]);
            if (inversiones.length > 0) {
                const sumaInversion = yield database_1.default.query("SELECT sum(valorInvertido) as suma FROM cred_inversiones where numContrato = ? order by fechaInversion DESC", [idSolicitud]);
                return res.json({
                    sumaInversion: sumaInversion[0],
                    data: inversiones,
                });
            }
            res
                .status(404)
                .json({ estado: "error", message: "idSolicitud no tienes inversiones" });
        });
    }
    //traer inversiones  por identidad del inversionista
    getInversionesByIdInversionista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idInversionista } = req.params;
            const inversiones = yield database_1.default.query("SELECT * FROM cred_inversiones where idInversionista = ? order by fechaInversion DESC", [idInversionista]);
            if (inversiones.length > 0) {
                return res.json({ estado: "ok", data: inversiones });
            }
            res
                .status(404)
                .json({ message: "Identidad inversionista no tienes inversiones" });
        });
    }
}
exports.inversionesController = new InversionesController();
