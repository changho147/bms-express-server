import {User} from "@src/entities/user/user";
import {Service} from "typedi";
import {EntityRepository, Repository, SelectQueryBuilder} from "typeorm";

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
    public async find(): Promise<User[]> {
        const queryBuilder: SelectQueryBuilder<User> = super.createQueryBuilder();
        return await queryBuilder.getMany();
    }

    public async login(entity: User): Promise<User | undefined> {
        const found = await super.createQueryBuilder().where("EMAIL = :email", {email: entity.email}).andWhere("ACTIVE_YN = 'Y'").getOne();
        console.log(found);
        if (!found) return undefined;

        const isPasswordMatched: boolean = await found.comparePassword(entity.password);
        if (!isPasswordMatched) return undefined;

        return found;
    }

    public async signUp(entity: User): Promise<User> {
        return await this.save(entity, {reload: true});
    }

    public async isDuplicateUser(email: string): Promise<boolean> {
        const found = await super.createQueryBuilder().where("email = :email", {email}).getOne();

        return !!found;
    }
}
