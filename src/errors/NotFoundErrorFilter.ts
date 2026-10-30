import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import type { Response } from "express";
import { NotFoundError } from "./NotFoundError.js";

@Catch(NotFoundError)
export class NotFoundErrorFilter implements ExceptionFilter {
    catch(error: NotFoundError, host: ArgumentsHost) {
        host.switchToHttp()
            .getResponse<Response>()
            .status(HttpStatus.NOT_FOUND)
            .json({ message: error.message, error: "Not Found", statusCode: HttpStatus.NOT_FOUND });
    }
}
