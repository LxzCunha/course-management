export type Content = {
    id: number;
    moduleId: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
};

export type CreateContentData = {
    moduleId: number;
    title: string;
    content: string;
};

export type UpdateContentData = Partial<CreateContentData>;
