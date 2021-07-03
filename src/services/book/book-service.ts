import {Service} from "typedi";
import {User} from "@src/entities/user/user";
import {BookRequestDto} from "@src/controllers/book/dto/book-request-dto";

@Service()
export class BookService {
    public async findByPaging(user: User, bookRequestDto: BookRequestDto): Promise<any> {
    }
}