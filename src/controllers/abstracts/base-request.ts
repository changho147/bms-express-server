import {EntityWithSequence} from "@src/entities/abstracts/entity-with-sequence";
import {EntityWithSequenceAndTime} from "@src/entities/abstracts/entity-with-sequence-and-time";
import {EntityWithSequenceAndTimeAndUser} from "@src/entities/abstracts/entity-with-sequence-and-time-and-user";

export abstract class BaseRequest {
    [index: string]: any;

    public toEntity<T extends EntityWithSequence | EntityWithSequenceAndTime | EntityWithSequenceAndTimeAndUser>(Clazz: new (...args: any[]) => T): T {
        const entity = new Clazz();
        const entityProperties = Reflect.ownKeys(entity);
        entityProperties.forEach(property => {
            if (Reflect.has(this, property)) Reflect.set(entity, property, this[property as string]);
        });

        return entity as T;
    }
}
