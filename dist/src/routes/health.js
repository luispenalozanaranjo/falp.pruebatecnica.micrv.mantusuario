"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.all('/', (req, res) => {
    const healthcheck = {
        status: '',
        uptime: process.uptime(),
        timestamp: Date.now(),
        message: '',
    };
    try {
        healthcheck.message = 'OK';
        healthcheck.status = 'UP';
        return res.status(200).json(healthcheck);
    }
    catch (error) {
        if (error instanceof Error) {
            healthcheck.message = error.name + ' ' + error.message;
        }
        else if (typeof error === 'string') {
            healthcheck.message = error;
        }
        else {
            healthcheck.message = 'Error no capturado';
        }
        healthcheck.status = 'DOWN';
        return res.status(503).json(healthcheck);
    }
});
module.exports = router;
