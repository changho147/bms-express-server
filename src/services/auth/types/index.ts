import {User} from "@src/entities/user/user";

export type LoginUser = Pick<User, "entityId" | "email" | "name">;
export type Token = {
    accessToken: string;
    refreshToken: string;
};

export type LoginUserAndToken = LoginUser & Token;
