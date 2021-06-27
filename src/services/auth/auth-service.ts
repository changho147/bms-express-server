import configs from "@src/configs";
import {Service} from "typedi";
import {InjectRepository} from "typeorm-typedi-extensions";
import {SignUpRequestDto} from "@src/controllers/auth/dto/signup-request-dto";
import {LoginRequestDto} from "@src/controllers/auth/dto/login-request-dto";
import {LoginDto} from "@src/services/auth/dto/login-dto";
import {UserRepository} from "@src/repositories/user/user-repository";
import {User} from "@src/entities/user/user";
import {Secret, sign} from "jsonwebtoken";
import createHttpError from "http-errors";
import {plainToClass} from "class-transformer";

@Service()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository: UserRepository) {}

    public async login(loginRequestDto: LoginRequestDto): Promise<any> {
        const user = await this.userRepository.login(loginRequestDto.toEntity(User));
        if (!user) throw createHttpError(401, `Failed Login. Checked Email Or Password.`);

        const accessToken = this.generateJwtAccessToken(user);
        const refreshToken = this.generateJwtRefreshToken(user);

        user.refreshToken = refreshToken;
        await this.userRepository.updateRefreshToken(user);

        return {
            loginUser: plainToClass(LoginDto, user, {excludeExtraneousValues: true}),
            accessToken,
            refreshToken
        };
    }

    public async signUp(signupRequestDto: SignUpRequestDto): Promise<User> {
        const isDuplicated = await this.userRepository.isDuplicateUser(signupRequestDto.email);
        if (isDuplicated) throw createHttpError(400, `[${signupRequestDto.email}] is duplicated Email.`);

        return await this.userRepository.signUp(signupRequestDto.toEntity(User));
    }

    public async refreshToken(token: string): Promise<any> {
        const user = await this.userRepository.findByToken(token);
        if (!user) throw createHttpError(401, `Token Refresh Failed. Not Exist User.`);

        const accessToken = this.generateJwtAccessToken(user);
        const refreshToken = this.generateJwtRefreshToken(user);

        user.refreshToken = refreshToken;
        await this.userRepository.updateRefreshToken(user);

        return {
            user: plainToClass(LoginDto, user, {excludeExtraneousValues: true}),
            accessToken,
            refreshToken
        }
    }

    public generateJwtAccessToken(user: User): string {
        return sign(
            {
                tokenType: "AccessToken",
                entityId: user.entityId,
                email: user.email,
                name: user.name
            },
            configs.JWT.SECRET_KEY as Secret,
            {expiresIn: "30m"}
        );
    }

    public generateJwtRefreshToken(user: User): string {
        return sign(
            {
                tokenType: "RefreshToken",
                entityId: user.entityId
            },
            configs.JWT.SECRET_KEY as Secret,
            {expiresIn: "14d"}
        );
    }
}
