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
exports.usuariosController = void 0;
const bcrypt = require("bcrypt");
const database_1 = __importDefault(require("../database"));
class UsuariosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield database_1.default.query("SELECT * FROM cred_usuario order by identidad ASC");
            res.json(usuarios);
        });
    }
    //recoger usuario por tipo
    getUsuarioByTipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tipo } = req.params;
            const usuarios = yield database_1.default.query("SELECT * FROM cred_usuario where tipoUsuario like ?", [tipo]);
            if (usuarios.length > 0) {
                return res.json(usuarios);
            }
            res.status(404).json({ message: "No existen usuarios" });
        });
    }
    //recoger usuario por identidad
    getUsuarioByIdentidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { identidad } = req.params;
            const usuarioDatos = yield database_1.default.query("SELECT * FROM cred_usuario where identidad like ?", [identidad]);
            if (usuarioDatos.length > 0) {
                return res.json(usuarioDatos);
            }
            res
                .status(404)
                .json({ message: "No existe usuario con la identidad enviada" });
        });
    }
    //crear un usuarios
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*  let password = req.body.password;
                 bcrypt.hash(password, 10,function(err: any, hash: any){
                    req.body.password = hash;
                 }); */
            console.log(req.body);
            yield database_1.default.query("INSERT INTO cred_usuario set ?", [req.body]);
            res.json({
                message: "Usuario Guardado con exito",
            });
            // res.status(404).json({ message : 'Error registrando usuario'});
        });
    }
    //eliminar un usuarios
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("DELETE FROM cred_usuario WHERE idUsuario = ?", [id]);
            res.json({ message: "Usuario fue eliminado" });
        });
    }
    //actualizar un usuario
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("UPDATE cred_usuario set ? WHERE identidad = ?", [
                req.body,
                id,
            ]);
            res.json({
                esdado: "ok",
                message: "Usuario fue actualizado",
            });
        });
    }
}
exports.usuariosController = new UsuariosController();
