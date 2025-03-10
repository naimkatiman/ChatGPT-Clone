"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, '../../public')));
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from AI Chatbot!' });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
