export class ValidationError extends Error {
    constructor(readonly details: string | string[]) {
        super(Array.isArray(details) ? details.join("; ") : details);
        this.name = "ValidationError";
    }
}
