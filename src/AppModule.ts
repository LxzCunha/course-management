import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ContentsController } from "./controller/ContentsController.js";
import { CoursesController } from "./controller/CoursesController.js";
import { ModulesController } from "./controller/ModulesController.js";
import { ReportsController } from "./controller/ReportsController.js";
import { UsersController } from "./controller/UsersController.js";
import { DatabaseModule } from "./database/DatabaseModule.js";
import { ContentsRepository } from "./repository/ContentsRepository.js";
import { CoursesRepository } from "./repository/CoursesRepository.js";
import { ModulesRepository } from "./repository/ModulesRepository.js";
import { ReportsRepository } from "./repository/ReportsRepository.js";
import { UsersRepository } from "./repository/UsersRepository.js";
import { ContentsService } from "./service/ContentsService.js";
import { CoursesService } from "./service/CoursesService.js";
import { ModulesService } from "./service/ModulesService.js";
import { ReportsService } from "./service/ReportsService.js";
import { UsersService } from "./service/UsersService.js";

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule],
    controllers: [ReportsController, UsersController, CoursesController, ModulesController, ContentsController],
    providers: [
        ReportsService,
        ReportsRepository,
        UsersService,
        UsersRepository,
        CoursesService,
        CoursesRepository,
        ModulesService,
        ModulesRepository,
        ContentsService,
        ContentsRepository,
    ],
})
export class AppModule {}
