import { Injectable, ParseIntPipe } from "@nestjs/common";
import { ValidationError } from "../errors/ValidationError.js";

@Injectable()
export class ParseIdPipe extends ParseIntPipe {
    constructor() {
        super({ exceptionFactory: (message) => new ValidationError(message) });
    }
}
