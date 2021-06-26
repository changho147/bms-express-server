import configs from "@src/configs";
import {ExtractJwt, Strategy as JsonWebTokenStrategy, StrategyOptions, VerifiedCallback} from "passport-jwt";
import {PassportStatic} from "passport";

const jsonWebTokenStrategyOptions: StrategyOptions = {
    secretOrKey: configs.JWT.SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jsonWebTokenStrategy: JsonWebTokenStrategy = new JsonWebTokenStrategy(jsonWebTokenStrategyOptions, async (token: any, done: VerifiedCallback) => {
    try {
        if (!token) return await done(null, undefined);

        return await done(null, token);
    } catch (error) {
        await done(error, undefined);
    }
});

export default (passport: PassportStatic): void => {
    passport.use(jsonWebTokenStrategy);
};
