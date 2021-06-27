import {PrimaryGeneratedColumn} from "typeorm";
import {Expose} from "class-transformer";

export abstract class EntityWithSequence {
    @Expose()
    @PrimaryGeneratedColumn({
        name: "ENTITY_ID",
        type: "bigint"
    })
    entityId: number;
}
