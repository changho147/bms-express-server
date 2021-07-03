import {BaseRequest} from "@src/controllers/abstracts/base-request";

export abstract class BaseRequestWithPaging extends BaseRequest {
    page: number | 1;
    countPerPage: number | 30;

    public getOffset(): number {
        return (this.page - 1) * this.countPerPage;
    }

    public getLimit(): number {
        return this.countPerPage;
    }

    public getNext(): number {
        return this.countPerPage + 1;
    }
}
