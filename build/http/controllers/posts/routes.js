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

// src/http/controllers/posts/routes.ts
var routes_exports = {};
__export(routes_exports, {
  postsRouter: () => postsRouter
});
module.exports = __toCommonJS(routes_exports);
var import_express = __toESM(require("express"));

// src/http/controllers/posts/get-post-by-id.ts
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

// src/errors/post-not-found-error.ts
var PostNotFoundError = class extends Error {
  constructor() {
    super("The post you requested doesn't exists.");
  }
};

// src/repositories/prisma/prisma-posts-repository.ts
var PrismaPostsRepository = class {
  async create(post) {
    const isThereMainPost = await prisma.mainPost.findFirst();
    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        slug: post.slug,
        content: post.content,
        categories: post.categories
      }
    });
    if (!isThereMainPost) {
      await prisma.mainPost.create({
        data: {
          id: newPost.id
        }
      });
    }
    return newPost;
  }
  async getPostById(id) {
    const post = await prisma.post.findUnique({
      where: {
        id
      }
    });
    if (!post) {
      throw new PostNotFoundError();
    }
    return post;
  }
  async fetchPosts({ page, perPage }) {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc"
      },
      include: {
        categories: true
      },
      skip: (page - 1) * perPage,
      take: perPage
    });
    return posts;
  }
  async totalCount() {
    const count = await prisma.post.count();
    return count;
  }
  async makePostMain(id) {
    const post = await prisma.post.findUnique({
      where: {
        id
      }
    });
    if (!post) {
      throw new PostNotFoundError();
    }
    const currentMainPostId = await prisma.mainPost.findFirst();
    if (!currentMainPostId) {
      throw new Error("There are no posts yet.");
    }
    await prisma.mainPost.update({
      where: {
        id: currentMainPostId.id
      },
      data: {
        id: post.id
      }
    });
    return post;
  }
  async getMainPost() {
    const currentMainPostId = await prisma.mainPost.findFirst();
    if (!currentMainPostId) {
      throw new Error("There are no posts yet.");
    }
    const post = await prisma.post.findUnique({
      where: {
        id: currentMainPostId.id
      },
      include: {
        categories: true
      }
    });
    if (!post) {
      throw new PostNotFoundError();
    }
    return post;
  }
  async getPostBySlug(slug) {
    const post = await prisma.post.findFirst({
      where: {
        slug
      },
      include: {
        categories: true
      }
    });
    if (!post) {
      throw new PostNotFoundError();
    }
    return post;
  }
};

// src/use-cases/get-post-by-id-use-case.tsx
var GetPostByIdUseCase = class {
  constructor(postsRepository) {
    this.postsRepository = postsRepository;
  }
  async execute({
    id
  }) {
    const post = await this.postsRepository.getPostById(id);
    return { post };
  }
};

// src/use-cases/factories/make-get-post-by-id-use-case.tsx
function makeGetPostByIdUseCase() {
  const postsRepository = new PrismaPostsRepository();
  const useCase = new GetPostByIdUseCase(postsRepository);
  return useCase;
}

// src/http/controllers/posts/get-post-by-id.ts
var getPostByIdBodySchema = import_zod2.z.object({
  id: import_zod2.z.string().uuid()
});
async function getPostById(request, response) {
  const { id } = getPostByIdBodySchema.parse(request.params);
  const useCase = makeGetPostByIdUseCase();
  const post = await useCase.execute({ id });
  return response.status(200).send(post);
}

// src/http/controllers/posts/create-post.ts
var import_zod3 = require("zod");

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

// src/use-cases/create-post-use-case.tsx
var CreatePostUseCase = class {
  constructor(categoriesRepository, postsRepository) {
    this.categoriesRepository = categoriesRepository;
    this.postsRepository = postsRepository;
  }
  async execute({
    title,
    content,
    categories
  }) {
    const slug = generateSlug(title);
    const post = await this.postsRepository.create({
      title,
      slug,
      content,
      categories: {
        connect: categories.map((category) => ({ title: category }))
      }
    });
    return {
      post
    };
  }
};

// src/use-cases/factories/make-create-post-use-case.tsx
function makeCreatePostUseCase() {
  const categoriesRepository = new PrismaCategoriesRepository();
  const postsRepository = new PrismaPostsRepository();
  const useCase = new CreatePostUseCase(categoriesRepository, postsRepository);
  return useCase;
}

// src/http/controllers/posts/create-post.ts
var createPostBodySchema = import_zod3.z.object({
  title: import_zod3.z.string(),
  content: import_zod3.z.string(),
  categories: import_zod3.z.array(import_zod3.z.string())
});
async function createPost(request, response) {
  const { title, content, categories } = createPostBodySchema.parse(request.body);
  const useCase = makeCreatePostUseCase();
  const post = await useCase.execute({
    title,
    content,
    categories
  });
  return response.status(200).send(post);
}

// src/use-cases/fetch-posts-use-case.tsx
var FetchPostsUseCase = class {
  constructor(postsRepository) {
    this.postsRepository = postsRepository;
  }
  async execute({
    page,
    perPage
  }) {
    const [
      posts,
      count
    ] = await Promise.all([
      this.postsRepository.fetchPosts({ page, perPage }),
      this.postsRepository.totalCount()
    ]);
    const totalPages = Math.ceil(count / perPage);
    return {
      page,
      perPage,
      totalPages,
      posts
    };
  }
};

// src/use-cases/factories/make-fetch-posts-use-case.tsx
function makeFetchPostsUseCase() {
  const postsRepository = new PrismaPostsRepository();
  const useCase = new FetchPostsUseCase(postsRepository);
  return useCase;
}

// src/http/controllers/posts/fetch-posts.ts
var import_zod4 = require("zod");
var fetchPostsQueryParams = import_zod4.z.object({
  page: import_zod4.z.string().default("1").transform((val) => parseInt(val, 10)),
  perPage: import_zod4.z.string().default("1000").transform((val) => parseInt(val, 10))
});
async function fetchPosts(request, response) {
  const { page, perPage } = fetchPostsQueryParams.parse(request.query);
  const useCase = makeFetchPostsUseCase();
  const {
    posts,
    totalPages
  } = await useCase.execute({ page, perPage });
  return response.status(200).send({
    page,
    perPage,
    totalPages,
    posts
  });
}

// src/use-cases/get-main-post-use-case.tsx
var GetMainPostUseCase = class {
  constructor(postsRepository) {
    this.postsRepository = postsRepository;
  }
  async execute() {
    const post = await this.postsRepository.getMainPost();
    return { post };
  }
};

// src/use-cases/factories/make-get-main-post-use-case.tsx
function makeGetMainPostUseCase() {
  const postsRepository = new PrismaPostsRepository();
  const useCase = new GetMainPostUseCase(postsRepository);
  return useCase;
}

// src/http/controllers/posts/get-main-post.ts
async function getMainPost(request, response) {
  const useCase = makeGetMainPostUseCase();
  const post = await useCase.execute();
  return response.status(200).send(post);
}

// src/use-cases/update-main-post-use-case.tsx
var UpdateMainPostUseCase = class {
  constructor(postsRepository) {
    this.postsRepository = postsRepository;
  }
  async execute({
    id
  }) {
    const post = await this.postsRepository.makePostMain(id);
    return { post };
  }
};

// src/use-cases/factories/make-update-main-post-use-case.tsx
function makeUpdateMainPostUseCase() {
  const postsRepository = new PrismaPostsRepository();
  const useCase = new UpdateMainPostUseCase(postsRepository);
  return useCase;
}

// src/http/controllers/posts/update-main-post.ts
var import_zod5 = require("zod");
var updateMainPostParams = import_zod5.z.object({
  id: import_zod5.z.string().uuid()
});
async function updateMainPost(request, response) {
  const { id } = updateMainPostParams.parse(request.params);
  const useCase = makeUpdateMainPostUseCase();
  const post = await useCase.execute({ id });
  return response.status(200).send(post);
}

// src/http/controllers/posts/get-post-by-slug.ts
var import_zod6 = require("zod");

// src/use-cases/get-post-by-slug-use-case.tsx
var GetPostBySlugUseCase = class {
  constructor(postsRepository) {
    this.postsRepository = postsRepository;
  }
  async execute({
    slug
  }) {
    const post = await this.postsRepository.getPostBySlug(slug);
    return { post };
  }
};

// src/use-cases/factories/make-get-post-by-slug-use-case.tsx
function makeGetPostBySlugUseCase() {
  const postsRepository = new PrismaPostsRepository();
  const useCase = new GetPostBySlugUseCase(postsRepository);
  return useCase;
}

// src/http/controllers/posts/get-post-by-slug.ts
var getPostBySlugBodySchema = import_zod6.z.object({
  slug: import_zod6.z.string()
});
async function getPostBySlug(request, response) {
  const { slug } = getPostBySlugBodySchema.parse(request.params);
  const useCase = makeGetPostBySlugUseCase();
  const post = await useCase.execute({ slug });
  return response.status(200).send(post);
}

// src/http/controllers/posts/routes.ts
var postsRouter = import_express.default.Router();
postsRouter.get("/", fetchPosts);
postsRouter.get("/main", getMainPost);
postsRouter.get("/id/:id", getPostById);
postsRouter.get("/slug/:slug", getPostBySlug);
postsRouter.post("/", createPost);
postsRouter.patch("/main/:id", updateMainPost);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  postsRouter
});
