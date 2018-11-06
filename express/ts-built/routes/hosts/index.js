"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const hosts = [{ address: '1.1.1.1' }, { address: '2.2.2.2' }];
router.get('/', (_, res) => {
    res.json(hosts);
});
exports.default = router;
