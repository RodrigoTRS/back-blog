import { MenuOption } from "@prisma/client"
import { generateSlug } from "../utils/generate-slug"
import { MenuOptionsRepository } from "../repositories/menu-options-repository"

interface CreateMenuOptionUseCaseRequest {
    title: string,
}

interface CreateMenuOptionUseCaseResponse {
    menuOption: MenuOption
}

export class CreateMenuOptionUseCase {
    constructor(
        private menuOptionsRepository: MenuOptionsRepository
    ) {}

    async execute({
        title,
    }: CreateMenuOptionUseCaseRequest): Promise<CreateMenuOptionUseCaseResponse> {

        const slug = generateSlug(title)

        const menuOption = await this.menuOptionsRepository.create({
            title,
            slug,
        })

        return {
            menuOption
        }
        
    }
}