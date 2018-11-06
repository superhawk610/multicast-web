"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const hosts_1 = require("./routes/hosts");
const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use('/hosts', hosts_1.default);
app.listen(PORT, () => {
    console.log(`multicast-web-server listening on :${PORT}`);
});
