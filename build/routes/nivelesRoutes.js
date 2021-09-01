"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middleware/validarToken");
const nivelesController_1 = require("../controllers/nivelesController");
class NivelesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/", validarToken_1.verifyToken, nivelesController_1.nivelesController.list);
        this.router.post("/addNivel1", validarToken_1.verifyToken, nivelesController_1.nivelesController.createNivel1);
    }
}
const nivelesRoutes = new NivelesRoutes();
exports.default = nivelesRoutes.router;
