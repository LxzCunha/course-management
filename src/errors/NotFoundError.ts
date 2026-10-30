export class NotFoundError extends Error {
    constructor(resource: string, id: number) {
        super(`${resource} ${id} not found`);
        this.name = "NotFoundError";
    }
}
