import * as dotenv from "dotenv";
dotenv.config({ path: process.cwd() + '/.env' });

export const config = {
    app:{
        port: parseInt( process.env.APP_PORT as string )
    },
    db: {
        type: process.env.GENFOL_TYPE,
        host: process.env.GENFOL_DBHOST,
        username: process.env.GENFOL_USERDB,
        password: process.env.GENFOL_PASSDB,
        port: parseInt(process.env.GENFOL_DBPORT as string),
        database: process.env.GENFOL_DB,
        synchronize: true,
        logging: true,
        entities: []
        //subscribers: [],
        //migrations: []

    },
    saglog:{
        app: process.env.SAGLOG_APP
    }
}