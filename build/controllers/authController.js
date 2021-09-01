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
exports.authController = void 0;
const database_1 = __importDefault(require("../database"));
const jwt = require("jsonwebtoken");
class AuthController {
    //validar inicio de session
    validar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { pw } = req.params;
            const data = yield database_1.default.query('SELECT * FROM cred_usuario where identidad = ? and password = ? and estado like "Activo"', [id, pw]);
            if (data.length > 0) {
                const token = jwt.sign({ user: data }, "secretkey");
                return res.json({
                    token: token,
                    acceso: data,
                    idError: 1,
                });
            }
            return res.json({
                message: "El usuario no existe",
                idError: 0,
            });
        });
    }
    //recuperar tipo de usuario registrado
    getTipoUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const tipoUsuario = yield database_1.default.query("SELECT tipoUsuario FROM tb_usuario where identidad = ?", [id]);
            if (tipoUsuario.length > 0) {
                return res.json(tipoUsuario);
            }
            return res.json({
                message: "No existe tipo de usuario",
                idError: 0,
            });
        });
    }
}
exports.authController = new AuthController();
