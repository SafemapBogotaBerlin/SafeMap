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
exports.getColdPointsModel = exports.addColdPointModel = void 0;
const firestore_1 = require("firebase/firestore");
const db_1 = __importDefault(require("./db"));
;
function addColdPointModel(testData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const docRef = yield (0, firestore_1.addDoc)((0, firestore_1.collection)(db_1.default, 'dangerPoints'), testData);
            return docRef.id;
        }
        catch (error) {
            console.error('Error adding document: ', error);
            return undefined;
        }
    });
}
exports.addColdPointModel = addColdPointModel;
function getColdPointsModel() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const docRef = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(db_1.default, 'dangerPoints'));
            const documents = [];
            docRef.forEach((doc) => {
                const data = doc.data();
                documents.push(data);
            });
            return documents;
        }
        catch (error) {
            console.error('Error adding document: ', error);
            return undefined;
        }
    });
}
exports.getColdPointsModel = getColdPointsModel;
//# sourceMappingURL=testModel.js.map