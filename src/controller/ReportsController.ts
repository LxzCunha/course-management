import { Controller, Get, Param } from "@nestjs/common";
import { ParseIdPipe } from "../pipes/ParseIdPipe.js";
import { ReportsService } from "../service/ReportsService.js";

@Controller("reports")
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) {}

    @Get("users-with-most-courses")
    getUsersWithMostCourses() {
        return this.reportsService.getUsersWithMostCourses();
    }

    @Get("courses-with-most-contents")
    getCoursesWithMostContents() {
        return this.reportsService.getCoursesWithMostContents();
    }

    @Get("courses-overview")
    getCoursesOverview() {
        return this.reportsService.getCoursesOverview();
    }

    @Get("contents")
    getContentsWithCourse() {
        return this.reportsService.getContentsWithCourse();
    }

    @Get("contents/:contentId/viewers")
    getContentViewers(@Param("contentId", ParseIdPipe) contentId: number) {
        return this.reportsService.getContentViewers(contentId);
    }
}
