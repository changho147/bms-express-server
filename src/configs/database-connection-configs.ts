import configs from "@src/configs";
import {ConnectionOptions} from "typeorm";
import {getExportedByRequireContext} from "@src/utils/require-context-util";

if (!configs.DATASOURCE.TYPE) throw new Error("Couldn't find DatabaseType Property.");

type SupportedDataSourceTypes = "mysql" | "mariadb" | "oracle" | "mongodb";

export default {
    type: configs.DATASOURCE.TYPE as SupportedDataSourceTypes,
    host: configs.DATASOURCE.HOST,
    port: Number(configs.DATASOURCE.PORT),
    database: configs.DATASOURCE.NAME,
    username: configs.DATASOURCE.USERNAME,
    password: configs.DATASOURCE.PASSWORD,
    synchronize: configs.TYPEORM.SYNCHRONIZE === "true",
    dropSchema: configs.TYPEORM.DROP_SCHEMA === "true",
    migrationsRun: configs.TYPEORM.MIGRATIONS_RUN === "true",
    migrationsTableName: configs.TYPEORM.MIGRATIONS_TABLE_NAME || "migrations",
    logging: configs.TYPEORM.LOGGING === "true",
    connectTimeout: Number(configs.DATASOURCE.CONNECT_TIMEOUT),
    entities: getExportedByRequireContext(require.context("@src/entities/", true, /\.ts$/)),
    migrations: getExportedByRequireContext(require.context("@src/migrations/", true, /\.ts$/))
} as ConnectionOptions;
