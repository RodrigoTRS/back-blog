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

// src/use-cases/get-post-by-slug-use-case.tsx
var get_post_by_slug_use_case_exports = {};
__export(get_post_by_slug_use_case_exports, {
  GetPostBySlugUseCase: () => GetPostBySlugUseCase
});
module.exports = __toCommonJS(get_post_by_slug_use_case_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetPostBySlugUseCase
});
