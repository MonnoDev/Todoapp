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
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING || 'mongodb+srv://admin:<>@cluster0.pdxzamm.mongodb.net/?retryWrites=true&w=majority';
const dbName = process.env.DB_NAME || 'ToDoList';
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const client = new mongodb_1.MongoClient(URI);
app.post('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content } = req.body;
        const con = yield client.connect();
        const collection = con.db(dbName).collection('ToDoList');
        yield collection.insertOne({ content });
        yield con.close();
        return res.status(201).json({ message: 'Todo item added successfully' });
    }
    catch (error) {
        return res.status(500).send(error);
    }
}));
app.get('/todos', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const con = yield client.connect();
        const collection = con.db(dbName).collection('ToDoList');
        const data = yield collection.find().toArray();
        yield con.close();
        res.send(data);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
