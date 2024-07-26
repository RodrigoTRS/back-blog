import { MenuOption } from "@prisma/client"
import { MenuOptionsRepository } from "../repositories/menu-options-repository"

interface FetchMenuOptionsUseCaseResponse {
    menuOptions: MenuOption[]
}

export class FetchMenuOptionsUseCase {
    constructor(
        private menuOptionsRepository: MenuOptionsRepository
    ) {}

    async execute(): Promise<FetchMenuOptionsUseCaseResponse> {
        const menuOptions = await this.menuOptionsRepository.fetchAll()
        return {
            menuOptions
        }
    }
}