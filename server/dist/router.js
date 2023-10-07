"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testController_1 = require("./controllers/testController");
const router = (0, express_1.Router)();
//routes
router.get('/', (req, res) => {
    res.send("This is a basic route!");
});
router.post('/addDangerPoint', testController_1.addPoint);
router.get('/getDangerPoints', testController_1.getColdPoints);
exports.default = router;
//# sourceMappingURL=router.js.map