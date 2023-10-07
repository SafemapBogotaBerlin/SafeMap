"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testController_1 = require("./controllers/testController");
const router = (0, express_1.Router)();
//routes
router.get('/', (req, res) => {
    res.send("This is a basic route!");
});
router.post('/addTest', testController_1.addTest);
router.get('/getTest', testController_1.getTest);
exports.default = router;
//# sourceMappingURL=router.js.map