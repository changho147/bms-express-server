import {BaseResponse} from "@src/services/abstracts/base-response";

export interface BaseResponseWithPaging<T> extends BaseResponse<T> {
    page: number;
    countPerPage: number;
    totalCount: number;
}