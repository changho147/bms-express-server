import configs from "@src/configs";
import "winston-daily-rotate-file";
import {createLogger, format, Logger} from "winston";
import expressWinston from "express-winston";
import {Console, DailyRotateFile} from "winston/lib/winston/transports";

const isProduction: boolean = configs.ENV === "production";
const transportOptions: {[K: string]: any} = {
    console: {
        level: configs.LOG.LEVEL,
        handleExceptions: true
    },
    dailyRotateFile: {
        level: configs.LOG.LEVEL,
        dirname: configs.LOG.DIR,
        filename: "application-%DATE%.log",
        datePattern: "YYYY-MM-DD",
        handleExceptions: true,
        zippedArchive: false,
        maxFiles: "10d"
    }
};

const logger: Logger = createLogger({
    transports: [isProduction ? new DailyRotateFile(transportOptions.dailyRotateFile) : new Console(transportOptions.console)],
    format: format.combine(
        format.errors({stack: true}),
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        format.printf(info => {
            const commonLogFormat = `[${info?.timestamp}][${info?.level}] ${info?.message}`;
            if (info?.stack) return `${commonLogFormat} \n ${info.stack}`;

            return `${commonLogFormat} ${info?.meta?.req?.headers ? `\n requestHeaders: ${JSON.stringify(info.meta.req.headers)}` : ""} ${
                info?.meta?.req?.query ? `\n requestParameters: ${JSON.stringify(info.meta.req.query)}` : ""
            } ${info?.meta?.req?.body ? `\n requestBody: ${JSON.stringify(info.meta.req.body)}` : ""} ${info?.meta?.res ? `\n response: ${JSON.stringify(info.meta.res)}` : ""}`;
        })
    )
});

const addBodyIgnoresByConfigs = (): void => {
    const ignores: any[] = (configs.LOG.BODY_IGNORES).trim().split(",");
    ignores.map(item => expressWinston.bodyBlacklist.push(item.trim()));
}
addBodyIgnoresByConfigs();

expressWinston.requestWhitelist.push("body");
expressWinston.responseWhitelist.push("body");

export default logger as Logger;
