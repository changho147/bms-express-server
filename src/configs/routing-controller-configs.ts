import configs from "@src/configs";
import {authorizationMiddleware} from "@src/middlewares/authorization-middleware";
import {getExportedByRequireContext} from "@src/utils/require-context-util";
import {currentUserMiddleware} from "@src/middlewares/current-user-middleware";

export default {
    cors: true,
    defaultErrorHandler: false,
    validation: {
        dismissDefaultMessages: false,
        validationError: {
            target: false,
            value: false
        }
    },
    routePrefix: `${configs.API.PREFIX}/${configs.API.VERSION}`,
    authorizationChecker: authorizationMiddleware,
    currentUserChecker: currentUserMiddleware,
    controllers: getExportedByRequireContext(require.context("@src/controllers/", true, /\.ts$/)),
    middlewares: getExportedByRequireContext(require.context("@src/middlewares/", true, /\.ts$/))
};
