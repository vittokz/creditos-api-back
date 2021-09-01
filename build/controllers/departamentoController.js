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
exports.departamentosController = void 0;
const database_1 = __importDefault(require("../database"));
class DepartamentosController {
    listDepartamentos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const departamentos = yield database_1.default.query("SELECT * FROM cred_departamento order by nombre ASC");
            res.json(departamentos);
        });
    }
    //retornar un departamento segun su id
    getDeparId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const departamento = yield database_1.default.query("SELECT * FROM cred_departamento where id = ?", [id]);
            if (departamento.length > 0) {
                return res.json(departamento[0]);
            }
            res.status(404).json({ message: "Departamento no existe" });
        });
    }
    //retornar municipios segun departamento
    getMunicipiosPorIdDep(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const municipios = yield database_1.default.query("SELECT * FROM cred_municipios where idDepar = ?", [id]);
            if (municipios.length > 0) {
                return res.json(municipios);
            }
            res.status(404).json({ message: "No hay municipios del departamento" });
        });
    }
}
exports.departamentosController = new DepartamentosController();
