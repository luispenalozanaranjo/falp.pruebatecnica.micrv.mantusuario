import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { StatusCode } from 'status-code-enum'

export const validarCampos = (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(StatusCode.ClientErrorBadRequest).json(errors);
    }
    next();
}