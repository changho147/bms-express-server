import {PrimaryGeneratedColumn} from "typeorm";

export abstract class EntityWithSequence {
    @PrimaryGeneratedColumn({
        name: "ENTITY_ID",
        type: "bigint"
    })
    entityId: number;
}
