import { seedCategories } from "./categories";
import { seedMenuOptions } from "./menu-options";
import { seedPosts } from "./posts";

async function seedDB() {
    // await seedCategories();
    // await seedMenuOptions();
    await seedPosts(20);
}

seedDB()