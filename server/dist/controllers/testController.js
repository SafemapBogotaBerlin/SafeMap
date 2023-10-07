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
exports.getColdPoints = exports.addPoint = void 0;
const testModel_1 = require("../models/testModel");
function addPoint(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user_id, added_dttm, danger_type, coordinates } = req.body;
        const { latitude, longitude } = coordinates;
        if (!user_id || !added_dttm || !danger_type || !coordinates) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        try {
            const id = yield (0, testModel_1.addColdPointModel)({ user_id, added_dttm, danger_type, coordinates });
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
exports.addPoint = addPoint;
function getColdPoints(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('here');
            const documents = yield (0, testModel_1.getColdPointsModel)();
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
exports.getColdPoints = getColdPoints;
//# sourceMappingURL=testController.js.map