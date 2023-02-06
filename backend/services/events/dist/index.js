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
exports.startEventsServer = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "/Users/sabin2000/Documents/ethertix/backend/services/events/config.env" });
const app_1 = require("./app");
const port = process.env.PORT || 5301;
const startEventsServer = () => __awaiter(void 0, void 0, void 0, function* () {
    return app_1.app.listen(port, (error) => {
        if (!error) {
            console.log(`Events Service is now live on port ${port} in mode : ${process.env.NODE_ENV}`);
        }
        else {
            return console.error(error);
        }
    });
});
exports.startEventsServer = startEventsServer;
(0, exports.startEventsServer)();
