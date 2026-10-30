export const USER_STATUSES = ["active", "inactive"] as const;

export type UserStatus = (typeof USER_STATUSES)[number];

export type User = {
    id: number;
    name: string;
    email: string;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
};

export type CreateUserData = {
    name: string;
    email: string;
    status: UserStatus;
};

export type UpdateUserData = Partial<CreateUserData>;
