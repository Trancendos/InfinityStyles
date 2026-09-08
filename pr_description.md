🧹 Remove 'any' typing for AudioContext fallback

🎯 **What:** Removed the explicit `(window as any)` typecast when accessing `webkitAudioContext` in `components/split-flap-text.tsx` and defined a proper global interface for `Window` in a new `global.d.ts` file.
💡 **Why:** Using `any` bypasses TypeScript's type-checking and can introduce hard-to-find bugs while polluting autocomplete. By explicitly augmenting the `Window` interface globally with `typeof AudioContext`, the codebase retains type safety and provides better developer ergonomics while gracefully supporting WebKit legacy browsers.
✅ **Verification:** Verified by checking that `npx vitest run` and `pnpm run build` completed correctly. Manual checking confirmed the types in `components/split-flap-text.tsx` correctly resolve to the global configuration.
✨ **Result:** Improved maintainability, readable code, and adherence to TypeScript best practices without altering the underlying functionality.
