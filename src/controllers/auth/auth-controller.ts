import {Body, Get, JsonController, Post, Req, Res} from "routing-controllers";
import {Request, Response} from "express";
import {Inject, Service} from "typedi";
import {SignUpRequestDto} from "@src/controllers/auth/dto/signup-request-dto";
import {AuthService} from "@src/services/auth/auth-service";
import {LoginRequestDto} from "@src/controllers/auth/dto/login-request-dto";
import createHttpError from "http-errors";
import {decode, JwtPayload} from "jsonwebtoken";
import {LoginUser, LoginUserAndToken} from "@src/services/auth/types";
import {BaseResponse} from "@src/services/abstracts/base-response";

@Service()
@JsonController("/auth")
export class AuthController {
    @Inject()
    private authService: AuthService;

    @Post("/signup")
    public async signUp(@Body() signupRequestDto: SignUpRequestDto): Promise<BaseResponse<LoginUser>> {
        return await this.authService.signUp(signupRequestDto);
    }

    @Post("/login")
    public async login(@Res() res: Response, @Body() loginRequestDto: LoginRequestDto): Promise<BaseResponse<LoginUser>> {
        const response: BaseResponse<LoginUserAndToken> = await this.authService.login(loginRequestDto);

        res.setHeader("Access-Token", response.item!.accessToken);
        res.setHeader("Refresh-Token", response.item!.refreshToken);

        return response;
    }

    @Get("/token/refresh")
    public async refreshToken(@Req() req: Request, @Res() res: Response): Promise<LoginUser> {
        const authorization = String(req.headers.authorization || "");
        if (!authorization || !authorization.startsWith("Bearer ")) throw createHttpError(400, `Token Refresh Failed. Not Exist Refresh-Token.`);

        const token: string | JwtPayload | null = decode(authorization.substring(7, authorization.length));
        if (token && token["token-type"] !== "RefreshToken") throw createHttpError(400, `Token Refresh Failed. Not Exist Refresh-Token.`);

        const {item = {loginUser, accessToken, refreshToken}}: BaseResponse<LoginUserAndToken> = await this.authService.refreshToken(authorization.substring(7, authorization.length));
        res.setHeader("Access-Token", accessToken);
        res.setHeader("Refresh-Token", refreshToken);

        return loginUser;
    }
}
