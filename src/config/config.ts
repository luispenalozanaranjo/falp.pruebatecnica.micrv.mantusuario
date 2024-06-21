import * as dotenv from "dotenv";
dotenv.config({ path: process.cwd() + '/.env' });

export const config = {
    app:{
        port: parseInt( process.env.APP_PORT as string )
    },
    db: {
        type: process.env.FALP_TYPE,
        host: process.env.FALP_DBHOST,
        username: process.env.FALP_USERDB,
        password: process.env.FALP_PASSDB,
        port: parseInt(process.env.FALP_DBPORT as string),
        database: process.env.FALP_DB,
        synchronize: true,
        logging: true,
        entities: []
        //subscribers: [],
        //migrations: []

    },
    saglog:{
        app: process.env.FALPLOG_APP
    }
}