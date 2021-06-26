import "reflect-metadata";
import App from "@src/app";
import Logger from "@src/utils/logger";

try {
    new App().bootstrap();
} catch (error) {
    Logger.error(error);
}
