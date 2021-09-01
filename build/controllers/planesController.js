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
exports.planesController = void 0;
const database_1 = __importDefault(require("../database"));
class PlanesController {
    //lista todos los planes
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const planes = yield database_1.default.query('SELECT * FROM tb_plan order by id ASC');
            res.json(planes);
        });
    }
    //trae un plan
    getPlan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const plan = yield database_1.default.query('SELECT * FROM tb_plan where id = ?', [id]);
            if (plan.length > 0) {
                return res.json(plan[0]);
            }
            res.status(404).json({ message: 'El plan no existe' });
        });
    }
    //crear un plan
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO tb_plan set ?', [req.body]);
            res.json({
                message: 'Plan Guardado con exito'
            });
        });
    }
    //eliminar un plan
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM tb_plan WHERE id = ?', [id]);
            res.json({ message: 'Plan fue eliminado' });
        });
    }
    //actualizar un plan
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE tb_plan set id = ?', [req.body, id]);
            res.json({ message: 'plan fue actualizado' });
        });
    }
    //get asignacion d eplanes usuario
    getAsignaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const estado = 'Activo';
            const planes = yield database_1.default.query('SELECT tb_plan.*,tb_asignar_plan.id as idContrato FROM tb_asignar_plan,tb_plan where tb_asignar_plan.idCliente = ? and tb_asignar_plan.estado like ? and tb_plan.id like tb_asignar_plan.idPlan', [id, estado]);
            if (planes.length > 0) {
                return res.json(planes);
            }
            return res.json({
                message: 'No tiene usuarios asignados al plan',
                idError: 0
            });
        });
    }
    //getusuarios asignados a un plan segun identidad y plan
    getAsignacionesByPlan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { idPlan } = req.params;
            const usuariosPlan = yield database_1.default.query('SELECT tb_usuario.* FROM tb_asignar_plan,tb_tabla_personas_nivel1,tb_usuario where tb_tabla_personas_nivel1.idAsignacionPlan = ? and tb_tabla_personas_nivel1.idClienteAgrega like ? and tb_tabla_personas_nivel1.idClienteAgregado like tb_usuario.identidad', [idPlan, id]);
            console.log(usuariosPlan);
            if (usuariosPlan.length > 0) {
                return res.json(usuariosPlan);
            }
            return res.json({
                message: 'No tiene usuarios asignados al plan',
                idError: 0
            });
        });
    }
    //getusuarios asignados a un plan segun identidad y plan
    getAsignacionesByPlanNivel2(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { idPlan } = req.params;
            const usuariosPlan = yield database_1.default.query('SELECT tb_asignar_plan.id as idAsig,tb_usuario.*,tb_tabla_personas_nivel1.idAsignacionPlan' +
                'FROM tb_asignar_plan,tb_tabla_personas_nivel1,tb_usuario' +
                'where tb_tabla_personas_nivel1.idAsignacionPlan = ? and' +
                'tb_tabla_personas_nivel1.idClienteAgrega like ? and' +
                'tb_tabla_personas_nivel1.idClienteAgregado like tb_usuario.identidad' +
                'and tb_asignar_plan.idCliente like tb_tabla_personas_nivel1.idClienteAgrega', [idPlan, id]);
            if (usuariosPlan.length > 0) {
                return res.json({
                    success: 'true',
                    resul: usuariosPlan,
                });
            }
            return res.json({
                message: 'No tiene usuarios asignados al plan',
                idError: 0
            });
        });
    }
}
exports.planesController = new PlanesController();
