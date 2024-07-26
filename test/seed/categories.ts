import { api } from "../../src/lib/axios"


export const categories = [
    "Technology",
    "NodeJS",
    "Javacript",
    "CSS3",
    "ReactJS"
]

export async function seedCategories() {
    await Promise.all([
        categories.map((category) => {
            api.post("/categories", {
                title: category
            }) 
        })
    ])
}