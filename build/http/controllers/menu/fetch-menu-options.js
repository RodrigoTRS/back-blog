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

// src/http/controllers/menu/fetch-menu-options.ts
var fetch_menu_options_exports = {};
__export(fetch_menu_options_exports, {
  fetchMenuOptions: () => fetchMenuOptions
});
module.exports = __toCommonJS(fetch_menu_options_exports);

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

// src/repositories/prisma/prisma-menu-options-repository.ts
var PrismaMenuOptionsRepository = class {
  async create(menuOption) {
    const newMenuOption = await prisma.menuOption.create({
      data: {
        title: menuOption.title,
        slug: menuOption.slug
      }
    });
    return newMenuOption;
  }
  async fetchAll() {
    const menuOptions = await prisma.menuOption.findMany();
    return menuOptions;
  }
};

// src/use-cases/fetch-menu-options-use-case.tsx
var FetchMenuOptionsUseCase = class {
  constructor(menuOptionsRepository) {
    this.menuOptionsRepository = menuOptionsRepository;
  }
  async execute() {
    const menuOptions = await this.menuOptionsRepository.fetchAll();
    return {
      menuOptions
    };
  }
};

// src/use-cases/factories/make-fetch-menu-options-use-case.tsx
function makeFetchMenuOptionsUseCase() {
  const menuOptionsRepository = new PrismaMenuOptionsRepository();
  const useCase = new FetchMenuOptionsUseCase(menuOptionsRepository);
  return useCase;
}

// src/http/controllers/menu/fetch-menu-options.ts
async function fetchMenuOptions(request, response) {
  const useCase = makeFetchMenuOptionsUseCase();
  const menuOptions = await useCase.execute();
  return response.status(200).send(menuOptions);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fetchMenuOptions
});
