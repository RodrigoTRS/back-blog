export class RegisterError extends Error {
    constructor() {
        super("Couldn't register user properly.")
    }
}