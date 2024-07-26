import { api } from "../../src/lib/axios"


export const menuOptions = [
    "Home",
    "Latest",
]

export async function seedMenuOptions() {
    await Promise.all([
        menuOptions.map((option) => {
            api.post("/menu", {
                title: option
            }) 
        })
    ])
}