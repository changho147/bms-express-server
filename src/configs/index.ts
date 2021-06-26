import {config, DotenvConfigOutput} from "dotenv";
import path from "path";

const env: string | undefined = process.env.ENV;
const envNameMap: {[K: string]: string} = {
    local: "local.env",
    dev: "dev.env",
    prod: "prod.env"
};

if (!env) throw new Error("Couldn't find ENV Property.");
const configs: DotenvConfigOutput = config({
    path: path.resolve(process.cwd(), `.env/${envNameMap[env]}`)
});

if (!configs) throw new Error(`Couldn't find ${envNameMap[env]} file.`);

export default {
    ENV: process.env.ENV,
    APP: {
        PORT: process.env.APP_PORT || 8080
    },
    API: {
        PREFIX: process.env.API_PREFIX || "/rest/api",
        VERSION: process.env.API_VERSION || "v1"
    },
    LOG: {
        LEVEL: process.env.LOG_LEVEL || "debug",
        DIR: process.env.LOG_DIR || "logs",
        BODY_IGNORES: process.env.LOG_BODY_IGNORES || ""
    },
    DATASOURCE: {
        TYPE: process.env.DATASOURCE_TYPE,
        HOST: process.env.DATASOURCE_HOST,
        PORT: process.env.DATASOURCE_PORT,
        NAME: process.env.DATASOURCE_NAME,
        USERNAME: process.env.DATASOURCE_USERNAME,
        PASSWORD: process.env.DATASOURCE_PASSWORD,
        CONNECT_TIMEOUT: process.env.DATASOURCE_CONNECT_TIMEOUT || 10000
    },
    TYPEORM: {
        SYNCHRONIZE: process.env.TYPEORM_SYNCHRONIZE,
        DROP_SCHEMA: process.env.TYPEORM_DROP_SCHEMA,
        MIGRATIONS_TABLE_NAME: process.env.MIGRATIONS_TABLE_NAME,
        MIGRATIONS_RUN: process.env.TYPEORM_MIGRATIONS_RUN,
        LOGGING: process.env.TYPEORM_LOGGING
    },
    JWT: {
        SECRET_KEY: process.env.JWT_SECRET_KEY
    }
};
