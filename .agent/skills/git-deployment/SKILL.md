---
name: git-deployment
description: >-
  Procedures for clean Git version control hygiene, atomic commits,
  GitHub repository setup, and Vercel production deployment.
---

# Skill: Git & Deployment

## Purpose
Ensure robust version control management, clean commit histories, secret protection, and zero-downtime Vercel deployments.

## When to Use
- When initializing repositories, making atomic feature commits, or deploying production builds.

## Inputs
- Production-ready workspace files.
- `.gitignore` and `.env.example`.

## Workflow
1. Validate that `.env.local` and `node_modules` are ignored.
2. Run `npm run lint` and `npm run build` to confirm clean compilation.
3. Stage modified files and compose semantic conventional commit messages (`feat:`, `fix:`, `chore:`).
4. Verify git tree with `git status` and `git log`.
5. Link remote repository and deploy to Vercel production environment.

## Tools
- Git CLI
- Vercel CLI / GitHub integration

## Rules
- Never commit secrets, credentials, or private API keys.
- Never commit broken builds.
- Do not force push to shared main branches.

## Expected Outputs
- Clean git history.
- Verified production deployment URL.

## Validation Checklist
- [ ] `.gitignore` protects environment files and build artifacts.
- [ ] `npm run build` passes with zero errors.
- [ ] Initial commit created: `chore: initialize website clone workspace`.

## Common Mistakes
- Committing `.next/` or `.env` files into source control.
- Pushing commits with unresolved TypeScript or ESLint errors.
