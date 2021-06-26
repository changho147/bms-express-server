import configs from "@src/configs";
import {Body, Get, JsonController, Post, Req, Res} from "routing-controllers";
import {NextFunction, Request, Response} from "express";
import {Inject, Service} from "typedi";
import {sign} from "jsonwebtoken";
import {User} from "@src/entities/user/user";
import {SignUpRequestDto} from "@src/controllers/auth/dto/signup-request-dto";
import {AuthService} from "@src/services/auth/auth-service";
import {LoginRequestDto} from "@src/controllers/auth/dto/login-request-dto";
import {JwtTokenDto} from "@src/services/auth/dto/jwt-token-dto";

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
    public async login(@Body() loginRequestDto: LoginRequestDto): Promise<JwtTokenDto> {
        return await this.authService.login(loginRequestDto);
    }

    @Get("/token")
    public tokenTest(@Req() req: Request, @Res() res: Response, next: NextFunction): void {
        const token = sign("tester", configs.JWT.SECRET_KEY as string);
        res.json({
            token: `Bearer ${token}`
        });
    }
}
