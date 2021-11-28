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
exports.pagosController = void 0;
const database_1 = __importDefault(require("../database"));
class PagosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pagos = yield database_1.default.query("SELECT * FROM cred_pagos WHERE estado like 'Activo' order by fechaRegistro DESC");
            res.json(pagos);
        });
    }
    getPagosByNumContrato(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCredito } = req.params;
            const pagos = yield database_1.default.query("SELECT * FROM cred_pagos where idCredito = ?", [idCredito]);
            if (pagos.length > 0) {
                return res.json(pagos);
            }
            else {
                res.json({ message: "numContrato no tiene pagos" });
            }
        });
    }
    //get mayor numero de cuota
    getNumeroCuota(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCredito } = req.params;
            const pagos = yield database_1.default.query("SELECT * FROM cred_pagos where idCredito = ? order by fechaRegistro DESC limit 1", [idCredito]);
            if (pagos.length > 0) {
                return res.json(pagos[0]);
            }
            else {
                res.json({ message: "numContrato no tiene pagos" });
            }
        });
    }
    //crear un pago
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("INSERT INTO cred_pagos set ?", [req.body]);
            res.json({
                estado: "ok",
                credito: req.body,
                message: "Pago guardado",
            });
        });
    }
    //crear pago nomral credito
    createPagoNormal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body;
            /*   await pool.query("INSERT INTO cred_pagos set ?", [req.body]);
        
            res.json({
              estado: "ok",
              credito: req.body,
              message: "Pago guardado",
            }); */
        });
    }
    //crear pago nomral credito
    createPagoProximasCuotas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
        });
    }
    //eliminar un pago
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("DELETE FROM cred_pagos WHERE idCredito = ?", [id]);
            res.json({ message: "Pago fue eliminado" });
        });
    }
}
exports.pagosController = new PagosController();
