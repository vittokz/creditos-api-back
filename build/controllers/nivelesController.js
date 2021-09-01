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
exports.nivelesController = void 0;
const database_1 = __importDefault(require("../database"));
class NivelesController {
    //trae todos los niveles
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const niveles = yield database_1.default.query("SELECT * FROM prueba");
            res.json(niveles);
        });
    }
    //agregar persona a nivel 1
    createNivel1(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const resp = yield database_1.default.query("SELECT * FROM tb_tabla_personas_nivel1 where idAsignacionPlan = ? and idClienteAgregado = ?", [idAsignacionPlan, idClienteAgregado]);
            if (resp.length <= 0) {
                const resp2 = yield database_1.default.query("SELECT * FROM tb_tabla_personas_nivel1 where idAsignacionPlan = ?", [idAsignacionPlan]);
                if (resp2.length < 3) {
                    yield database_1.default.query("INSERT INTO tb_tabla_personas_nivel1 set ?", [
                        req.body,
                    ]);
                    yield database_1.default.query("INSERT INTO tb_asignar_plan set ?", [dataAsignar]);
                    res.json({
                        message: "Persona asignada con exito en nivel 1 y con plan creado.",
                        idError: 0,
                    });
                }
                else {
                    res.json({
                        message: "Ya tiene 3 personas en el nivel",
                        idError: 1,
                    });
                }
            }
            else {
                res.json({
                    message: "Persona ya esta asignado al plan",
                    idError: 2,
                });
            }
        });
    }
}
exports.nivelesController = new NivelesController();
