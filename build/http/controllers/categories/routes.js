var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/http/controllers/categories/routes.ts
var routes_exports = {};
__export(routes_exports, {
  categoriesRouter: () => categoriesRouter
});
module.exports = __toCommonJS(routes_exports);
var import_express = __toESM(require("express"));

// src/http/controllers/categories/create-category.ts
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

// src/http/controllers/categories/routes.ts
var categoriesRouter = import_express.default.Router();
categoriesRouter.post("/", createCategory);
categoriesRouter.get("/", fetchCategories);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  categoriesRouter
});
