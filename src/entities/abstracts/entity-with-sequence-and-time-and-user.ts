import {Column, PrimaryGeneratedColumn} from "typeorm";

export abstract class EntityWithSequenceAndTimeAndUser {
    @PrimaryGeneratedColumn({
        name: "ENTITY_ID",
        type: "bigint"
    })
    entityId: number;

    @Column({
        name: "REG_USER",
        type: "varchar",
        length: 50
    })
    regUser: string;

    @Column({
        name: "REG_DATE",
        type: "timestamp",
        default: () => 'CURRENT_TIMESTAMP'
    })
    regDate: Date;

    @Column({
        name: "MOD_USER",
        type: "varchar",
        default: null,
        length: 50
    })
    modUser: string;

    @Column({
        name: "MOD_DATE",
        type: "timestamp",
        nullable: true,
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    modDate: Date;
}
