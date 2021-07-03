export class BaseResponse<T> {
    item?: T;
    items?: T[];

    constructor(item: T | T[]) {
        // if (typeof item === "object") this.item = item as T;
        const test: T = item as T;


    }

    private setProperties(item: T) {
    }
}
