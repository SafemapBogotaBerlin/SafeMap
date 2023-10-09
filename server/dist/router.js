"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pointsColdController_1 = require("./controllers/pointsColdController");
const router = (0, express_1.Router)();
//routes
router.get('/', (req, res) => {
    res.send("This is a basic route!");
});
router.post('/addDangerPoint', pointsColdController_1.addPoint);
router.post('/addDangerPointRT', pointsColdController_1.addPointRT);
router.get('/getDangerPoints', pointsColdController_1.getColdPoints);
exports.default = router;
//# sourceMappingURL=router.js.map