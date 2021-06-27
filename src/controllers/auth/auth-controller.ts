import {Body, Get, JsonController, Post, Req, Res} from "routing-controllers";
import {Request, Response} from "express";
import {Inject, Service} from "typedi";
import {User} from "@src/entities/user/user";
import {SignUpRequestDto} from "@src/controllers/auth/dto/signup-request-dto";
import {AuthService} from "@src/services/auth/auth-service";
import {LoginRequestDto} from "@src/controllers/auth/dto/login-request-dto";
import {LoginDto} from "@src/services/auth/dto/login-dto";
import createHttpError from "http-errors";

@Service()
@JsonController("/auth")
export class AuthController {
    @Inject()
    private authService: AuthService;

    @Post("/signup")
    public async signUp(@Body() signupRequestDto: SignUpRequestDto): Promise<User> {
        return await this.authService.signUp(signupRequestDto);
    }

    @Post("/login")
    public async login(@Res() res: Response, @Body() loginRequestDto: LoginRequestDto): Promise<LoginDto> {
        const {loginUser, accessToken, refreshToken}: any = await this.authService.login(loginRequestDto);

        res.setHeader("Access-Token", accessToken);
        res.setHeader("Refresh-Token", refreshToken);

        return loginUser;
    }

    @Get("/token/refresh")
    public async refreshToken(@Req() req: Request, @Res() res: Response): Promise<LoginDto> {
        const authorization = String(req.headers.authorization || "");
        if (!authorization || !authorization.startsWith("Bearer ")) throw createHttpError(400, `Token Refresh Failed. Not Exist Refresh-Token.`);

        const {user, accessToken, refreshToken}: any = await this.authService.refreshToken(authorization.substring(7, authorization.length));
        res.setHeader("Access-Token", accessToken);
        res.setHeader("Refresh-Token", refreshToken);

        return user;
    }
}
