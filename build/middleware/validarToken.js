"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(" ")[1];
        jwt.verify(token, 'secretkey', (error) => {
            if (error) {
                res.json({
                    mensaje: "Acceso denegado",
                });
            }
            else {
                res.locals.token = token;
                next();
            }
        });
    }
    else {
        res.json({
            mensaje: " error de acceso"
        });
    }
};
exports.verifyToken = verifyToken;
