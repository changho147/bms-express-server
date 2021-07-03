import configs from "@src/configs";
import {Service} from "typedi";
import {InjectRepository} from "typeorm-typedi-extensions";
import {SignUpRequestDto} from "@src/controllers/auth/dto/signup-request-dto";
import {LoginRequestDto} from "@src/controllers/auth/dto/login-request-dto";
import {UserRepository} from "@src/repositories/user/user-repository";
import {User} from "@src/entities/user/user";
import {Secret, sign} from "jsonwebtoken";
import createHttpError from "http-errors";
import {LoginUser, LoginUserAndToken, Token} from "@src/services/auth/types";
import {BaseResponse} from "@src/services/abstracts/base-response";

@Service()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository: UserRepository) {}

    public async login(loginRequestDto: LoginRequestDto): Promise<BaseResponse<LoginUserAndToken>> {
        const user: User | undefined = await this.userRepository.login(loginRequestDto.toEntity(User));
        if (!user) throw createHttpError(401, `Failed Login. Checked Email Or Password.`);

        const tokens: Token = await this.generateTokenAndUpdate(user);
        return {
            item: {
                ...user,
                ...tokens
            }
        };
    }

    public async signUp(signupRequestDto: SignUpRequestDto): Promise<BaseResponse<LoginUser>> {
        const isDuplicated = await this.userRepository.isDuplicateUser(signupRequestDto.email);
        if (isDuplicated) throw createHttpError(400, `[${signupRequestDto.email}] is duplicated Email.`);

        const user: LoginUser = await this.userRepository.signUp<LoginUser>(signupRequestDto.toEntity(User));

        return {
            item: {
                ...user
            }
        };
    }

    public async refreshToken(token: string): Promise<BaseResponse<LoginUserAndToken>> {
        const user: LoginUser | undefined = await this.userRepository.findByToken(token);
        if (!user) throw createHttpError(401, `Token Refresh Failed. Not Exist User.`);

        const tokens: Token = await this.generateTokenAndUpdate(user);

        return {
            item: {
                ...user,
                ...tokens
            }
        };
    }

    protected async generateTokenAndUpdate(user: LoginUser): Promise<Token> {
        const accessToken = this.generateJwtAccessToken(user);
        const refreshToken = this.generateJwtRefreshToken(user);

        const entity: User = new User();
        entity.entityId = user.entityId;
        entity.refreshToken = refreshToken;
        await this.userRepository.updateRefreshToken(entity);

        return {
            accessToken,
            refreshToken
        };
    }

    protected generateJwtAccessToken(user: LoginUser): string {
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

    protected generateJwtRefreshToken(user: LoginUser): string {
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
