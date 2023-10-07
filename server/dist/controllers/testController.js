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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTest = exports.addTest = void 0;
const testModel_1 = require("../models/testModel");
function addTest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { value } = req.body;
        if (!value) {
            return res.status(400).json({ error: 'Value is required' });
        }
        try {
            const id = yield (0, testModel_1.addTestToFirestore)({ value });
            if (id) {
                res.status(201).json({ id });
            }
            else {
                res.status(500).json({ error: 'Failed to add test data' });
            }
        }
        catch (error) {
            console.error('Error adding test data: ', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.addTest = addTest;
function getTest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const documents = yield (0, testModel_1.getTestFromFirestore)();
            if (documents) {
                res.status(200).json(documents);
            }
            else {
                res.status(500).json({ error: 'Failed to fetch test data' });
            }
        }
        catch (error) {
            console.error('Error fetching test data: ', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.getTest = getTest;
//# sourceMappingURL=testController.js.map