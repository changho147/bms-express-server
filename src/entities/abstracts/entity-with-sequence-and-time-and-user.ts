import {Column} from "typeorm";
import {EntityWithSequenceAndTime} from "@src/entities/abstracts/entity-with-sequence-and-time";
import {Expose} from "class-transformer";

export abstract class EntityWithSequenceAndTimeAndUser extends EntityWithSequenceAndTime {
    @Expose()
    @Column({
        name: "REG_USER",
        type: "varchar",
        length: 50
    })
    regUser: string;

    @Expose()
    @Column({
        name: "MOD_USER",
        type: "varchar",
        default: null,
        length: 50
    })
    modUser: string;
}
