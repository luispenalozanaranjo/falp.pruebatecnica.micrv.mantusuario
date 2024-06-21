import { Router, Request, Response } from 'express';
const router = Router();

router.all('/', (req: Request, res: Response) => {
    
    const healthcheck = {
        status: '',
        uptime: process.uptime(),
        timestamp: Date.now(),
        message: '',
    };

    try{
        healthcheck.message = 'OK';
        healthcheck.status = 'UP';
        return res.status(200).json(healthcheck);

    }catch ( error:unknown ) {

        if( error instanceof Error ){
            healthcheck.message = error.name + ' ' + error.message;
            
        }else if( typeof error === 'string' ){
            healthcheck.message = error;

        }else{
            healthcheck.message = 'Error no capturado';
        }

        healthcheck.status = 'DOWN';
        return res.status(503).json(healthcheck);
    }
});

module.exports = router;