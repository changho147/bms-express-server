import {Action} from "routing-controllers";
import passport from "passport";

export async function authorizationMiddleware({request, response, next}: Action, roles: string[] | string): Promise<boolean> {
    passport.authenticate("jwt", {session: false}, (error, user) => {
        if (error) {
            return false;
        }


        return false;
    })(request, response, next);

    return false;
}
