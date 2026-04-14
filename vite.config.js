import { defineConfig } from 'vite';

// Must match the repository name segment in https://<user>.github.io/<repo>/
// If you rename the repo, update this path.
const repoBase = '/LushaiTravels/';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? repoBase : '/',
  publicDir: 'public',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
});
