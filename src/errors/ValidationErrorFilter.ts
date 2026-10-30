import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import type { Response } from "express";
import { ValidationError } from "./ValidationError.js";

@Catch(ValidationError)
export class ValidationErrorFilter implements ExceptionFilter {
    catch(error: ValidationError, host: ArgumentsHost) {
        host.switchToHttp()
            .getResponse<Response>()
            .status(HttpStatus.BAD_REQUEST)
            .json({ message: error.details, error: "Bad Request", statusCode: HttpStatus.BAD_REQUEST });
    }
}
