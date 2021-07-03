import {EntityWithSequenceAndTimeAndUser} from "@src/entities/abstracts/entity-with-sequence-and-time-and-user";
import {Column, Entity} from "typeorm";

@Entity("BMS_BOOK_TM")
export class Book extends EntityWithSequenceAndTimeAndUser {
    @Column("varchar", {
        name: "NAME",
        length: 200,
        nullable: false
    })
    name: string;

    @Column("varchar", {
        name: "WRITER",
        length: 100,
        nullable: false
    })
    writer: string;

    @Column("timestamp", {
        name: "RELEASE_DATE",
        nullable: false
    })
    releaseDate: Date;
}
