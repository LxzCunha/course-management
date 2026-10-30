export type Course = {
    id: number;
    code: string;
    title: string;
    description: string | null;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
};

export type CreateCourseData = {
    code: string;
    title: string;
    description?: string | null;
    userId: number;
};

export type UpdateCourseData = Partial<CreateCourseData>;
