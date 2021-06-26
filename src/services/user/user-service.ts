import {Service} from "typedi";
import {InjectRepository} from "typeorm-typedi-extensions";
import {UserRepository} from "@src/repositories/user/user-repository";
import {User} from "@src/entities/user/user";

@Service()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: UserRepository) {}

    public async find(): Promise<User[]> {
        return await this.userRepository.find();
    }
}
