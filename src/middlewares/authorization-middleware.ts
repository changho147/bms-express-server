import {Action} from "routing-controllers";
import passport from "passport";

export async function authorizationMiddleware({request, response, next}: Action, roles: string[] | string): Promise<boolean> {
    let isAuth = false;
    passport.authenticate("jwt", {session: false}, (error, accessToken) => {
        if (error) return isAuth;

        isAuth = !!accessToken;
    })(request, response, next);

    return isAuth;
}
