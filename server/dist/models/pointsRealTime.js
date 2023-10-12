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
exports.deleteRealTimeCollection = exports.addRealTimePointModel = void 0;
const database_1 = require("firebase/database");
const db_1 = require("./db");
const database = (0, database_1.getDatabase)(db_1.app);
function addRealTimePointModel(data, collection) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('realtime here');
        const dbRef = (0, database_1.ref)(database, collection);
        const newPOint = (0, database_1.push)(dbRef);
        (0, database_1.set)(newPOint, data);
        return newPOint.key;
    });
}
exports.addRealTimePointModel = addRealTimePointModel;
function deleteRealTimeCollection(collection) {
    return __awaiter(this, void 0, void 0, function* () {
        const dbRef = (0, database_1.ref)(database, collection);
        (0, database_1.remove)(dbRef);
    });
}
exports.deleteRealTimeCollection = deleteRealTimeCollection;
//# sourceMappingURL=pointsRealTime.js.map