import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./AppModule.js";
import { NotFoundErrorFilter } from "./errors/NotFoundErrorFilter.js";
import { ValidationError } from "./errors/ValidationError.js";
import { ValidationErrorFilter } from "./errors/ValidationErrorFilter.js";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            exceptionFactory: (errors) =>
                new ValidationError(errors.flatMap((error) => Object.values(error.constraints ?? {}))),
        }),
    );
    app.useGlobalFilters(new NotFoundErrorFilter(), new ValidationErrorFilter());
    app.enableShutdownHooks();
    await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
