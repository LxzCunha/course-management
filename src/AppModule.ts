import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ReportsController } from "./controller/ReportsController.js";
import { DatabaseModule } from "./database/DatabaseModule.js";
import { ReportsRepository } from "./repository/ReportsRepository.js";
import { ReportsService } from "./service/ReportsService.js";

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule],
    controllers: [ReportsController],
    providers: [ReportsService, ReportsRepository],
})
export class AppModule {}
