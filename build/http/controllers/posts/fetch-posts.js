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

// src/http/controllers/posts/fetch-posts.ts
var fetch_posts_exports = {};
__export(fetch_posts_exports, {
  fetchPosts: () => fetchPosts
});
module.exports = __toCommonJS(fetch_posts_exports);

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
var import_zod2 = require("zod");
var fetchPostsQueryParams = import_zod2.z.object({
  page: import_zod2.z.string().default("1").transform((val) => parseInt(val, 10)),
  perPage: import_zod2.z.string().default("1000").transform((val) => parseInt(val, 10))
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fetchPosts
});
