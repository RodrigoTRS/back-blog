import { api } from "../../src/lib/axios"
import { faker } from '@faker-js/faker';
import { categories as _categories, categories } from "./categories";
import { randomInt } from "crypto";

function generatePost() {
    const post = {
        title: faker.word.words(10),
        categories: [
            _categories[randomInt(0,5)],
            _categories[randomInt(0,5)],
        ],
        content: faker.word.words(500),
    }

    return post
}

export async function seedPosts(num: number) {

    const postArray: {
        title: string,
        categories: string[],
        content: string
    }[] = []

    for (let i=0;i<num;i++) {
        const post = generatePost();
        await api.post("/posts", {
            title: post.title,
            categories: post.categories,
            content: post.content,
        })
    }
}