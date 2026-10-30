import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CoursesController } from "./controller/CoursesController.js";
import { ReportsController } from "./controller/ReportsController.js";
import { UsersController } from "./controller/UsersController.js";
import { DatabaseModule } from "./database/DatabaseModule.js";
import { CoursesRepository } from "./repository/CoursesRepository.js";
import { ReportsRepository } from "./repository/ReportsRepository.js";
import { UsersRepository } from "./repository/UsersRepository.js";
import { CoursesService } from "./service/CoursesService.js";
import { ReportsService } from "./service/ReportsService.js";
import { UsersService } from "./service/UsersService.js";

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule],
    controllers: [ReportsController, UsersController, CoursesController],
    providers: [
        ReportsService,
        ReportsRepository,
        UsersService,
        UsersRepository,
        CoursesService,
        CoursesRepository,
    ],
})
export class AppModule {}
