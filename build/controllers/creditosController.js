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
exports.creditosController = void 0;
const database_1 = __importDefault(require("../database"));
class CreditosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const creditos = yield database_1.default.query("SELECT * FROM cred_credito WHERE estado like 'Activo' order by fechaRegistro DESC");
            res.json(creditos);
        });
    }
    getCredito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log("id", id);
            const credito = yield database_1.default.query("SELECT * FROM cred_credito where numContrato = ?", [id]);
            if (credito.length > 0) {
                return res.json(credito[0]);
            }
            res.status(404).json({ message: "Credito no existe" });
        });
    }
    //traer creditos por identidad del cliente
    getCreditoByIdentidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { identidad } = req.params;
            const creditos = yield database_1.default.query("SELECT * FROM cred_credito where idCliente = ? and estado like 'Activo'", [identidad]);
            if (creditos.length > 0) {
                return res.json(creditos);
            }
            res.status(404).json({ message: "Identidad no tiene creditos" });
        });
    }
    //traer creditos con estado por invertir
    getCreditoByEstado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { estado } = req.params;
            const creditos = yield database_1.default.query("SELECT * FROM cred_credito where estado = ?", [estado]);
            if (creditos.length > 0) {
                return res.json(creditos);
            }
            res
                .status(404)
                .json({ message: "Identidad no tiene creditos por invertir" });
        });
    }
    //crear un credito
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("INSERT INTO cred_credito set ?", [req.body]);
            res.json({
                estado: "ok",
                credito: req.body,
                message: "Credito Guardada",
            });
        });
    }
    //eliminar una credito
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("DELETE FROM cred_credito WHERE idCredito = ?", [id]);
            res.json({ message: "Credito fue eliminado" });
        });
    }
    //actualizar un credito
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("UPDATE cred_credito set id = ?", [req.body, id]);
            res.json({ estado: "ok", message: "Credito fue actualizado" });
        });
    }
}
exports.creditosController = new CreditosController();
