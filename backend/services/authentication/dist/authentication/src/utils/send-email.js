"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTransporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
require('dotenv').config();
const emailTransporter = () => {
    return nodemailer_1.default.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "31c4555f29ccbb",
            pass: "66af38be36d489"
        }
    });
};
exports.emailTransporter = emailTransporter;
