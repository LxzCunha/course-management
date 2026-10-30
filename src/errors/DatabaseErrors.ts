import { DatabaseError } from "pg";

// https://www.postgresql.org/docs/current/errcodes-appendix.html
const UNIQUE_VIOLATION = "23505";
const FOREIGN_KEY_VIOLATION = "23503";
// Raised instead of 23503 when the foreign key is declared with ON DELETE RESTRICT
const RESTRICT_VIOLATION = "23001";

export function isUniqueViolation(error: unknown): boolean {
    return error instanceof DatabaseError && error.code === UNIQUE_VIOLATION;
}

export function isForeignKeyViolation(error: unknown): boolean {
    return (
        error instanceof DatabaseError &&
        (error.code === FOREIGN_KEY_VIOLATION || error.code === RESTRICT_VIOLATION)
    );
}
