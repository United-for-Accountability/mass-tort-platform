# mass-tort-platform
A public-facing platform for the United for Accountability mass tort movement. This site includes the Declaration of Harm, legal evidence, public submissions, AI assistant, and tools for systemic justice.

## Development

This repository uses Node.js 24 (see `.nvmrc`) and `npm` as the package manager.

```bash
npm ci
npm run dev
```

## Quality and Security Checks

Run these checks before opening a PR:

```bash
npm test
npm run build
npm audit
```

If a restricted environment prevents Turbopack from starting local workers, run
`npm run build -- --webpack` to verify the production build with webpack.

## Dependency maintenance

Commit `package-lock.json` with dependency changes and use `npm ci` for reproducible installs.
The Firestore dependency currently pins an older gRPC release; a scoped override in
`package.json` selects patched gRPC 1.14.7 or newer. Review this override when upgrading
Firebase and remove it once Firestore selects a patched version itself.

The regression tests cover admin token comparison, CSV formula injection, strict consent,
CAPTCHA verification, and submission request validation. Production Firebase rules,
credentials, and external service configuration require a separate deployment review.

See [SECURITY.md](SECURITY.md) for request limits, automated scans, deployment requirements,
and the remaining production access-control checks.
