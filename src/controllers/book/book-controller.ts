import {Authorized, CurrentUser, Get, JsonController, QueryParams} from "routing-controllers";
import {Inject, Service} from "typedi";
import {BookService} from "@src/services/book/book-service";
import {User} from "@src/entities/user/user";
import {BookRequestDto} from "@src/controllers/book/dto/book-request-dto";

@Service()
@Authorized()
@JsonController("/book")
export class BookController {
    @Inject()
    private bookService: BookService;

    @Get("/books")
    public async findByPaging(@CurrentUser() user: User, @QueryParams() bookRequestDto: BookRequestDto): Promise<any> {
        return await this.bookService.findByPaging(user, bookRequestDto);
    }
}
