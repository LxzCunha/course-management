import { Injectable } from "@nestjs/common";
import { NotFoundError } from "../errors/NotFoundError.js";
import { ReportsRepository } from "../repository/ReportsRepository.js";

@Injectable()
export class ReportsService {
    constructor(private readonly reportsRepository: ReportsRepository) {}

    getUsersWithMostCourses() {
        return this.reportsRepository.findUsersWithMostCourses();
    }

    getCoursesWithMostContents() {
        return this.reportsRepository.findCoursesWithMostContents();
    }

    getCoursesOverview() {
        return this.reportsRepository.findCoursesOverview();
    }

    getContentsWithCourse() {
        return this.reportsRepository.findContentsWithCourse();
    }

    async getContentViewers(contentId: number) {
        if (!(await this.reportsRepository.contentExists(contentId))) {
            throw new NotFoundError("Content", contentId);
        }
        return this.reportsRepository.findContentViewers(contentId);
    }
}
