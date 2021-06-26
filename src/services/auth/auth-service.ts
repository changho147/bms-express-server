import configs from "@src/configs";
import {Service} from "typedi";
import {InjectRepository} from "typeorm-typedi-extensions";
import {SignUpRequestDto} from "@src/controllers/auth/dto/signup-request-dto";
import {LoginRequestDto} from "@src/controllers/auth/dto/login-request-dto";
import {JwtTokenDto} from "@src/services/auth/dto/jwt-token-dto";
import {UserRepository} from "@src/repositories/user/user-repository";
import {User} from "@src/entities/user/user";
import {Secret, sign} from "jsonwebtoken";
import createHttpError from "http-errors";

@Service()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository: UserRepository) {}

    public async login(loginRequestDto: LoginRequestDto): Promise<JwtTokenDto> {
        const loginUser = await this.userRepository.login(loginRequestDto.toEntity(User));
        if (!loginUser) throw createHttpError(401, `Fail Login. Checked Email Or Password.`);

        const accessToken = this.generateJwtAccessToken(loginUser);
        const refreshToken = this.generateJwtRefreshToken(loginUser);

        return new JwtTokenDto(accessToken, refreshToken);
    }

    public async signUp(signupRequestDto: SignUpRequestDto): Promise<User> {
        const isDuplicated = await this.userRepository.isDuplicateUser(signupRequestDto.email);
        if (isDuplicated) throw createHttpError(400, `[${signupRequestDto.email}] is duplicated Email.`);

        return await this.userRepository.signUp(signupRequestDto.toEntity(User));
    }

    public generateJwtAccessToken(user: User): string {
        return sign(
            {
                userEntityId: user.entityId,
                userEmail: user.email,
                userName: user.name
            },
            configs.JWT.SECRET_KEY as Secret,
            {expiresIn: "30m"}
        );
    }

    public generateJwtRefreshToken(user: User): string {
        return sign(
            {
                userEntityId: user.entityId,
                userEmail: user.email,
                userName: user.name
            },
            configs.JWT.SECRET_KEY as Secret,
            {expiresIn: "14d"}
        );
    }
}
