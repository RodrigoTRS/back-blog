export class CategoryNotFoundError extends Error {
    constructor() {
        super("The category you requested doesn't exists.")
    }
}