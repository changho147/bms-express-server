import {User} from "@src/entities/user/user";
import {Service} from "typedi";
import {EntityRepository, Repository, SelectQueryBuilder} from "typeorm";
import {plainToClass} from "class-transformer";

@Service()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
    public async find(): Promise<User[]> {
        const queryBuilder: SelectQueryBuilder<User> = super.createQueryBuilder();
        return await queryBuilder.getMany();
    }

    public async findByToken(refreshToken: string): Promise<User | undefined> {
        const found: User = plainToClass(
            User,
            await super
                .createQueryBuilder()
                .select("ENTITY_ID as entityId, EMAIL as email, NAME as name")
                .where("REFRESH_TOKEN = :refreshToken", {refreshToken})
                .andWhere("ACTIVE_YN = 'Y'")
                .getRawOne<User>()
        );
        if (!found) return undefined;

        return found;
    }

    public async login(entity: User): Promise<User | undefined> {
        const found: User = plainToClass(
            User,
            await super
                .createQueryBuilder()
                .select("ENTITY_ID as entityId, EMAIL as email, NAME as name, PASSWORD as password")
                .where("EMAIL = :email", {email: entity.email})
                .andWhere("ACTIVE_YN = 'Y'")
                .getRawOne<User>()
        );
        if (!found) return undefined;

        const isPasswordMatched: boolean = await found.comparePassword(entity.password!);
        if (!isPasswordMatched) return undefined;

        return found;
    }

    public async signUp<T>(entity: User): Promise<User> {
        const user = await this.save(entity, {reload: true});


        return await this.save(entity, {reload: true});
    }

    public async updateRefreshToken(entity: User): Promise<User | undefined> {
        return await this.save(entity, {reload: true});
    }

    public async isDuplicateUser(email: string): Promise<boolean> {
        const found = await super.createQueryBuilder().where("email = :email", {email}).getOne();

        return !!found;
    }

    private setProperty() {

    }
}
