import { Prisma } from "@prisma/client"
import { prisma } from "../../lib/prisma"
import { MenuOptionsRepository } from "../menu-options-repository"

export class PrismaMenuOptionsRepository implements MenuOptionsRepository {
    async create(menuOption: Prisma.MenuOptionUncheckedCreateInput) {
        const newMenuOption = await prisma.menuOption.create({
            data: {
                title: menuOption.title,
                slug: menuOption.slug
            }
        })

        return newMenuOption
    }

    async fetchAll() {
        const menuOptions =await prisma.menuOption.findMany()
        return menuOptions;
    }
}