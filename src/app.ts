import * as typeormExtensions from "typeorm-typedi-extensions";
import {createConnection, useContainer as useTypeormContainer} from "typeorm";
import {useExpressServer, useContainer as useRoutingContainer} from "routing-controllers";
import Container from "typedi";
import Logger from "@src/utils/logger";
import expressWinston from "express-winston";
import express, {Express, json} from "express";
import configs from "@src/configs";
import routingControllerConfigs from "@src/configs/routing-controller-configs";
import databaseConnectionConfigs from "@src/configs/database-connection-configs";

import helmet from "helmet";
import cors from "cors";
import passport from "passport";
import passportStrategyConfigs from "@src/configs/passport-strategy-configs";

export default class App {
    private readonly app: Express;

    constructor() {
        this.app = express();
    }

    protected async setDatabase(): Promise<void> {
        useTypeormContainer(typeormExtensions.Container);
        await createConnection(databaseConnectionConfigs);
    }

    protected async setMiddlewares(): Promise<void> {
        this.app.use(helmet());
        this.app.use(json());
        this.app.use(cors());
        this.app.use(
            expressWinston.logger({
                winstonInstance: Logger
            })
        );

        this.app.use(passport.initialize());
        passportStrategyConfigs(passport);
    }

    public async bootstrap(): Promise<void> {
        try {
            await this.setDatabase();
            await this.setMiddlewares();

            useRoutingContainer(Container);
            useExpressServer(this.app, routingControllerConfigs);
            this.app.listen(configs.APP.PORT, () => {
                Logger.log("info", `Started Server on Port ${configs.APP.PORT}`);
            });
        } catch (error) {
            Logger.log("error", error.stack);
            process.exit(0);
        }
    }
}
