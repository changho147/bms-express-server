import {Expose} from "class-transformer";

export class LoginDto {
    @Expose()
    entityId: number;
    @Expose()
    email: string;
    @Expose()
    name: string;
}
