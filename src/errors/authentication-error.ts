export class AuthenticationError extends Error {
    constructor() {
        super("Failed to authenticate.")
    }
}