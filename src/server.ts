import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./AppModule.js";
import { NotFoundErrorFilter } from "./errors/NotFoundErrorFilter.js";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    app.useGlobalFilters(new NotFoundErrorFilter());
    app.enableShutdownHooks();
    await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
