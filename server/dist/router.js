"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
//routes
router.get('/', (req, res) => {
    res.send("Hello world!");
});
exports.default = router;
//# sourceMappingURL=router.js.map