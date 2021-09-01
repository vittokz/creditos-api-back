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
exports.testimoniosController = void 0;
const database_1 = __importDefault(require("../database"));
class TestimoniosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const testimonios = yield database_1.default.query('SELECT * FROM tb_testimonio order by fechaRegistro DESC');
            res.json(testimonios);
        });
    }
    getTestimonio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const testimonio = yield database_1.default.query('SELECT * FROM tb_testimonio where id = ?', [id]);
            if (testimonio.length > 0) {
                return res.json(testimonio[0]);
            }
            res.status(404).json({ message: 'El Testimonio no existe' });
        });
    }
    //crear un testimonio
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO tb_testimonio set ?', [req.body]);
            res.json({
                message: 'Testimonio Guardado con exito'
            });
        });
    }
    //eliminar un testimonio
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM tb_testimonio WHERE id = ?', [id]);
            res.json({ message: 'Testimonio fue eliminado' });
        });
    }
    //actualizar un testimonio
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE tb_testimonio set id = ?', [req.body, id]);
            res.json({ message: 'Testimonio fue actualizado' });
        });
    }
}
exports.testimoniosController = new TestimoniosController();
