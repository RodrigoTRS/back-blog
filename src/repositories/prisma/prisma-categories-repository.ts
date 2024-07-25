import { Prisma } from "@prisma/client"
import { CategoriesRepository } from "../categories-repository"
import { prisma } from "../../lib/prisma"

export class PrismaCategoriesRepository implements CategoriesRepository {
    async create(category: Prisma.CategoryUncheckedCreateInput) {
        const newCategory = await prisma.category.create({
            data: {
                title: category.title,
                slug: category.slug
            }
        })

        return newCategory
    }

    async fetchAll() {
        const categories =await prisma.category.findMany()
        return categories;
    }
}