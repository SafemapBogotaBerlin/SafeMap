"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pointsColdController_1 = require("./controllers/pointsColdController");
const pointsRTController_1 = require("./controllers/pointsRTController");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send("This is a basic route!");
});
router.post('/addDangerPoint', pointsColdController_1.addPoint);
router.post('/addDangerPointRT', pointsRTController_1.addPointRT);
router.get('/getDangerPoints', pointsColdController_1.getColdPoints);
exports.default = router;
//# sourceMappingURL=router.js.map