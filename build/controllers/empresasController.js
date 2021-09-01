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
exports.empresasController = void 0;
const database_1 = __importDefault(require("../database"));
class EmpresasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const empresas = yield database_1.default.query('SELECT * FROM dir_empresa order by razonSocial DESC');
            res.json(empresas);
        });
    }
    getEmpresa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const empresa = yield database_1.default.query('SELECT * FROM dir_empresa where id = ?', [id]);
            if (empresa.length > 0) {
                return res.json(empresa[0]);
            }
            res.status(404).json({ message: 'La empresa no existe' });
        });
    }
    //crear una empresa
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO dir_empresa set ?', [req.body]);
            res.json({
                message: 'Empresa Guardada'
            });
        });
    }
    //eliminar una empresa
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM dir_empresa WHERE id = ?', [id]);
            res.json({ message: 'Empresa fue eliminado' });
        });
    }
    //actualizar una empresa
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE dir_empresa set id = ?', [req.body, id]);
            res.json({ message: 'Empresa fue actualizado' });
        });
    }
}
exports.empresasController = new EmpresasController();
