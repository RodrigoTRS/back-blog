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

// src/http/controllers/posts/create-post.ts
var create_post_exports = {};
__export(create_post_exports, {
  createPost: () => createPost
});
module.exports = __toCommonJS(create_post_exports);
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
var createPostBodySchema = import_zod2.z.object({
  title: import_zod2.z.string(),
  content: import_zod2.z.string(),
  categories: import_zod2.z.array(import_zod2.z.string())
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createPost
});
