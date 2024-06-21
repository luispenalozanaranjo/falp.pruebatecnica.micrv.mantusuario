"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const config_1 = require("../../config/config");
(0, globals_1.describe)('Config', () => {
    (0, globals_1.it)('should have the correct app port', () => {
        (0, globals_1.expect)(config_1.config.app.port).toBeGreaterThan(0);
    });
    (0, globals_1.it)('should have the correct database server', () => {
        (0, globals_1.expect)(config_1.config.db.host).toBeDefined();
    });
    (0, globals_1.it)('should have the correct database user', () => {
        (0, globals_1.expect)(config_1.config.db.username).toBeDefined();
    });
    (0, globals_1.it)('should have the correct database password', () => {
        (0, globals_1.expect)(config_1.config.db.password).toBeDefined();
    });
    (0, globals_1.it)('should have the correct database port', () => {
        (0, globals_1.expect)(config_1.config.db.port).toBeGreaterThan(0);
    });
    (0, globals_1.it)('should have the correct database name', () => {
        (0, globals_1.expect)(config_1.config.db.database).toBeDefined();
    });
    (0, globals_1.it)('should have the correct the entities', () => {
        (0, globals_1.expect)(config_1.config.db.entities).toBe(true);
    });
    (0, globals_1.it)('should have the correct logging', () => {
        (0, globals_1.expect)(config_1.config.db.logging).toBe(false);
    });
    (0, globals_1.it)('should have the correct synchronize option', () => {
        (0, globals_1.expect)(config_1.config.db.synchronize).toBe(true);
    });
    (0, globals_1.it)('should have the correct type option', () => {
        (0, globals_1.expect)(config_1.config.db.type).toBe(true);
    });
    // Add more tests for other properties if needed
});
