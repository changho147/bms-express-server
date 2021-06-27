import {Action} from "routing-controllers";
import {decode} from "jsonwebtoken";
import {User} from "@src/entities/user/user";
import {plainToClass} from "class-transformer";

export async function currentUserMiddleware({request}: Action): Promise<User | undefined> {
    const authorization = String(request.headers.authorization || "");
    if (!authorization) return undefined;

    if (!authorization.startsWith("Bearer ")) return undefined;

    return plainToClass(User, decode(authorization.substring(7, authorization.length), {json: true}), {excludeExtraneousValues: true});
}
