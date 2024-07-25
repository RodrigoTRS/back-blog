export class PostNotFoundError extends Error {
    constructor() {
        super("The post you requested doesn't exists.")
    }
}