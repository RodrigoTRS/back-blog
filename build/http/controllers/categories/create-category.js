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

// src/http/controllers/categories/create-category.ts
var create_category_exports = {};
__export(create_category_exports, {
  createCategory: () => createCategory
});
module.exports = __toCommonJS(create_category_exports);
var import_zod2 = require("zod");

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

// src/utils/generate-slug.ts
function generateSlug(text) {
  const slug = text.replace(/ /g, "-").trim().toLowerCase();
  const removeDiatricts = replaceDiacritics(slug);
  const removedPunctuation = removePunctuation(removeDiatricts);
  return removedPunctuation;
}
function removePunctuation(str) {
  return str.replace(/[.,\/!?]/g, "");
}
var diacriticsMap = {
  "\xE1": "a",
  "\xE0": "a",
  "\xE4": "a",
  "\xE2": "a",
  "\xE3": "a",
  "\xE9": "e",
  "\xE8": "e",
  "\xEB": "e",
  "\xEA": "e",
  "\xED": "i",
  "\xEC": "i",
  "\xEF": "i",
  "\xEE": "i",
  "\xF3": "o",
  "\xF2": "o",
  "\xF6": "o",
  "\xF4": "o",
  "\xF5": "o",
  "\xFA": "u",
  "\xF9": "u",
  "\xFC": "u",
  "\xFB": "u",
  "\xF1": "n",
  "\xE7": "c"
};
function replaceDiacritics(text) {
  return text.replace(/[áàäâãéèëêíìïîóòöôõúùüûñç]/g, function(match) {
    return diacriticsMap[match];
  });
}

// src/use-cases/create-category-use-case.tsx
var CreateCategoryUseCase = class {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }
  async execute({
    title
  }) {
    const slug = generateSlug(title);
    const category = await this.categoriesRepository.create({
      title,
      slug
    });
    return {
      category
    };
  }
};

// src/use-cases/factories/make-create-category-use-case.tsx
function makeCreateCategoryUseCase() {
  const CategorysRepository = new PrismaCategoriesRepository();
  const useCase = new CreateCategoryUseCase(CategorysRepository);
  return useCase;
}

// src/http/controllers/categories/create-category.ts
var createCategoryBodySchema = import_zod2.z.object({
  title: import_zod2.z.string()
});
async function createCategory(request, response) {
  const { title } = createCategoryBodySchema.parse(request.body);
  const useCase = makeCreateCategoryUseCase();
  const category = await useCase.execute({ title });
  return response.status(201).send(category);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createCategory
});
