"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer = require("nodemailer");
exports.transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "vittoriocassetta@gmail.com",
        pass: "iyknhxxqjdukltjs", // generated ethereal password
    },
});
exports.transporter.verify().then(() => {
    console.log("Ready for send emails");
});
