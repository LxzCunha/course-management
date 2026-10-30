export type UserCourseRanking = {
    id: number;
    name: string;
    email: string;
    courseCount: number;
    rank: number;
};

export type CourseContentCount = {
    id: number;
    code: string;
    title: string;
    contentCount: number;
};

export type CourseOverview = {
    id: number;
    code: string;
    title: string;
    moduleCount: number;
    contentCount: number;
};

export type ContentWithCourse = {
    id: number;
    title: string;
    moduleTitle: string;
    courseTitle: string;
};

export type ContentViewer = {
    id: number;
    name: string;
    email: string;
    viewedAt: Date;
};
