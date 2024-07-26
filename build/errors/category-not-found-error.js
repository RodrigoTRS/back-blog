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

// src/errors/category-not-found-error.ts
var category_not_found_error_exports = {};
__export(category_not_found_error_exports, {
  CategoryNotFoundError: () => CategoryNotFoundError
});
module.exports = __toCommonJS(category_not_found_error_exports);
var CategoryNotFoundError = class extends Error {
  constructor() {
    super("The category you requested doesn't exists.");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CategoryNotFoundError
});
