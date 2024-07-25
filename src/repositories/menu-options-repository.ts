import { MenuOption, Prisma } from "@prisma/client";

export interface MenuOptionsRepository {
    create(MenuOption: Prisma.MenuOptionUncheckedCreateInput): Promise<MenuOption>
    fetchAll(): Promise<MenuOption[]>
}