"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
dotenv_1.default.config({ path: '../.env' });
const port = parseInt(process.env.SERVER_PORT);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(router_1.default);
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running at 0.0.0.0 on port ${port}`);
});
//# sourceMappingURL=index.js.map