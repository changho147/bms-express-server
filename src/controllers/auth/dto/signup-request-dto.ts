import {BaseRequest} from "@src/controllers/abstracts/base-request";
import {IsEmail, IsNotEmpty, IsString, Length, Matches} from "class-validator";

export class SignUpRequestDto extends BaseRequest {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/, {message: "Password format does not match"})
    password: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 10)
    name: string;
}
