import {Service} from "typedi";
import {ExpressMiddlewareInterface, Middleware} from "routing-controllers";
import {Request, Response} from "express";

@Service()
@Middleware({type: "after"})
export class ErrorMethodNotAllowedHandlerMiddleware implements ExpressMiddlewareInterface {
    public use(req: Request, res: Response): void {
        if (!res.headersSent) {
            res.status(405);
            res.json({
                statusCode: 9999,
                message: "Method Not Allowed"
            });
            res.end();
        }
    }
}