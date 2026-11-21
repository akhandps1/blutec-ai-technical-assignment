# Rule: Testing & Git Hygiene

1. **Zero-Error Builds:** Verify that `npm run build` and `npm run lint` execute with 0 errors before making any git commit.
2. **Semantic Commits:** Use clear conventional commit messages (`feat:`, `fix:`, `chore:`, `docs:`, `test:`).
3. **Atomic Milestones:** Commit code only after completing and validating a distinct section or page.
4. **Environment Isolation:** Never commit `.env` or `.env.local` files containing secrets or credentials.
5. **Cross-Viewport Verification:** Always run visual tests and route checks before declaring a milestone complete.
