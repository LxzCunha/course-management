export type Module = {
    id: number;
    courseId: number;
    title: string;
    description: string | null;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
};

export type CreateModuleData = {
    courseId: number;
    title: string;
    description?: string | null;
    userId: number;
};

export type UpdateModuleData = Partial<CreateModuleData>;
