import { Category, Prisma } from "@prisma/client";

export interface CategoriesRepository {
    create(Category: Prisma.CategoryUncheckedCreateInput): Promise<Category>
    fetchAll(): Promise<Category[]>
}