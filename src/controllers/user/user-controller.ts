import {Inject, Service} from "typedi";
import {Authorized, CurrentUser, Get, JsonController} from "routing-controllers";
import {UserService} from "@src/services/user/user-service";
import {User} from "@src/entities/user/user";

@Service()
@Authorized()
@JsonController("/user")
export class UserController {
    @Inject()
    private userService: UserService;

    @Get("/users")
    public async find(@CurrentUser() user: User): Promise<User[]> {
        return await this.userService.find();
    }

}