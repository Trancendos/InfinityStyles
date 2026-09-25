// vitest.config.mjs sets `globals: true`, so describe/it/expect/vi exist at
// runtime without being imported. TypeScript does not know that from the
// config, so without this every test file is 70-odd "Cannot find name"
// errors — which is what `ignoreBuildErrors: true` was hiding.
//
// A reference file rather than tsconfig's `types` array: setting `types` at all
// replaces the default @types resolution for the whole project, so it would
// silently drop node and react typings that nothing here asked to lose.
/// <reference types="vitest/globals" />
import "@testing-library/jest-dom/vitest";
