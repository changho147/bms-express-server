import {Column, PrimaryGeneratedColumn} from "typeorm";

export abstract class EntityWithSequenceAndTime {
    @PrimaryGeneratedColumn({
        name: "ENTITY_ID",
        type: "bigint"
    })
    entityId: number;

    @Column({
        name: "REG_DATE",
        type: "timestamp",
        default: () => 'CURRENT_TIMESTAMP'
    })
    regDate: Date;

    @Column({
        name: "MOD_DATE",
        type: "timestamp",
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    modDate: Date;
}
