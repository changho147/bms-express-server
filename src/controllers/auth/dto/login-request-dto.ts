import {BaseRequest} from "@src/controllers/abstracts/base-request";
import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class LoginRequestDto extends BaseRequest {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
