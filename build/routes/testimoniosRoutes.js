"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testimoniosController_1 = require("../controllers/testimoniosController");
const validarToken_1 = require("../middleware/validarToken");
class TestimoniosRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', validarToken_1.verifyToken, testimoniosController_1.testimoniosController.list);
        this.router.get('/:id', validarToken_1.verifyToken, testimoniosController_1.testimoniosController.getTestimonio);
        this.router.post('/', validarToken_1.verifyToken, testimoniosController_1.testimoniosController.create);
        this.router.delete('/:id', validarToken_1.verifyToken, testimoniosController_1.testimoniosController.delete);
        this.router.put('/:id', validarToken_1.verifyToken, testimoniosController_1.testimoniosController.update);
    }
}
const testimoniosRoutes = new TestimoniosRoutes();
exports.default = testimoniosRoutes.router;
