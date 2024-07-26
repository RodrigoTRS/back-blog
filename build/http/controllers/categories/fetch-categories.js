var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/http/controllers/categories/fetch-categories.ts
var fetch_categories_exports = {};
__export(fetch_categories_exports, {
  fetchCategories: () => fetchCategories
});
module.exports = __toCommonJS(fetch_categories_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");

// src/env.ts
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  PORT: import_zod.z.string().default("3333").transform((val) => parseInt(val, 10)),
  NODE_ENV: import_zod.z.enum(["development", "production"]),
  DATABASE_URL: import_zod.z.string()
});
var _env = envSchema.safeParse(process.env);
if (!_env.success) {
  throw new Error(_env.error.toString());
}
var env = _env.data;

// src/lib/prisma.ts
var prisma = new import_client.PrismaClient({
  log: env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : []
});

// src/repositories/prisma/prisma-categories-repository.ts
var PrismaCategoriesRepository = class {
  async create(category) {
    const newCategory = await prisma.category.create({
      data: {
        title: category.title,
        slug: category.slug
      }
    });
    return newCategory;
  }
  async fetchAll() {
    const categories = await prisma.category.findMany();
    return categories;
  }
};

// src/use-cases/fetch-categories-use-case.tsx
var FetchCategoriesUseCase = class {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }
  async execute() {
    const categories = await this.categoriesRepository.fetchAll();
    return {
      categories
    };
  }
};

// src/use-cases/factories/make-fetch-categories-use-case.tsx
function makeFetchCategoriesUseCase() {
  const CategorysRepository = new PrismaCategoriesRepository();
  const useCase = new FetchCategoriesUseCase(CategorysRepository);
  return useCase;
}

// src/http/controllers/categories/fetch-categories.ts
async function fetchCategories(request, response) {
  const useCase = makeFetchCategoriesUseCase();
  const categories = await useCase.execute();
  return response.status(200).send(categories);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fetchCategories
});
