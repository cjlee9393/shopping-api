"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const order_1 = __importDefault(require("./handlers/order"));
const product_1 = __importDefault(require("./handlers/product"));
const dashboard_1 = __importDefault(require("./handlers/dashboard"));
const user_1 = __importDefault(require("./handlers/user"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
// middleware 1
app.use(express_1.default.json());
// middleware 2
const corsOptions = {
    origin: 'http://someotherdomain.com',
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
(0, order_1.default)(app);
(0, product_1.default)(app);
(0, user_1.default)(app);
(0, dashboard_1.default)(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
