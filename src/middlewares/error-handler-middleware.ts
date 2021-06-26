import Logger from "@src/utils/logger";
import {ExpressErrorMiddlewareInterface, Middleware} from "routing-controllers";
import {Service} from "typedi";
import {NextFunction, Request, Response} from "express";
import {HttpError} from "http-errors";

const validateErrorParser = (errors: any[]): {[K: string]: any[]} => ({
    validate: errors.map(error => ({
        property: error.property,
        validate: error.constraints
    }))
});

@Service()
@Middleware({type: "after"})
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
    error(error: HttpError, req: Request, res: Response, next: NextFunction): void {
        Logger.error(error);
        if (error.errors) Logger.error(error.errors);

        if (error.status === Number(405) || error.httpCode === Number(405)) return next();

        res.status(error.status || error.httpCode || 500);

        let errors;
        if (error.errors) errors = validateErrorParser(error.errors);

        res.json({
            statusCode: error.errorCode || Number(9999),
            message: error.message || "Internal Server Error",
            errors
        });
        res.end();
    }
}
