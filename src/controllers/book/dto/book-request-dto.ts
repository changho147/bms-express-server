import {BaseRequestWithPaging} from "@src/controllers/abstracts/base-request-with-paging";

export class BookRequestDto extends BaseRequestWithPaging {
    name: string;
    writer: string;
}
