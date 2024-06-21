"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCampos = void 0;
const express_validator_1 = require("express-validator");
const status_code_enum_1 = require("status-code-enum");
const validarCampos = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(status_code_enum_1.StatusCode.ClientErrorBadRequest).json(errors);
    }
    next();
};
exports.validarCampos = validarCampos;
