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

// src/use-cases/factories/make-get-main-post-use-case.tsx
var make_get_main_post_use_case_exports = {};
__export(make_get_main_post_use_case_exports, {
  makeGetMainPostUseCase: () => makeGetMainPostUseCase
});
module.exports = __toCommonJS(make_get_main_post_use_case_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeGetMainPostUseCase
});
