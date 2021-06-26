import {BeforeInsert, Column, Entity} from "typeorm";
import {EntityWithSequenceAndTime} from "@src/entities/abstracts/entity-with-sequence-and-time";
import {compare, genSalt, hash} from "bcrypt";

@Entity("BMS_USER_TM")
export class User extends EntityWithSequenceAndTime {
    @Column("varchar", {
        name: "EMAIL",
        length: 50,
        nullable: false
    })
    email: string;

    @Column("varchar", {
        name: "PASSWORD",
        length: 200,
        nullable: false
    })
    password: string;

    @Column("varchar", {
        name: "NAME",
        length: 50,
        nullable: false
    })
    name: string;

    @Column("varchar", {
        name: "ACTIVE_YN",
        length: 1,
        nullable: false,
        default: () => "'Y'"
    })
    activeYn: string;

    @BeforeInsert()
    async encryptedPassword(): Promise<void> {
        this.password = await hash(this.password, await genSalt());
    }

    async comparePassword(password: string): Promise<boolean> {
        return await compare(password, this.password);
    }
}
