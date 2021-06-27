import {Column} from "typeorm";
import {EntityWithSequence} from "@src/entities/abstracts/entity-with-sequence";
import {Expose} from "class-transformer";

export abstract class EntityWithSequenceAndTime extends EntityWithSequence {
    @Expose()
    @Column({
        name: "REG_DATE",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    regDate: Date;

    @Expose()
    @Column({
        name: "MOD_DATE",
        type: "timestamp",
        nullable: true,
        onUpdate: "CURRENT_TIMESTAMP"
    })
    modDate: Date;
}
