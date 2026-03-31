# LushaiTrips - Mizoram Tourism App

A frontend web application for discovering Mizoram's tourism experiences, including destinations, stays, guides, transport, and curated itineraries.

This project is built with [Vite](https://vitejs.dev/) and is ready to be deployed on GitHub Pages.

## Live Demo

[Live Site](https://shawreel24.github.io/LushaiTravels/)

## Features

- Discover tourist destinations across Mizoram
- Browse stays and local travel services
- Explore guides, transport, and itinerary options
- Multi-page SPA-style navigation using modular page components
- Responsive UI for desktop and mobile

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES Modules)
- Vite

## Project Structure

```text
.
|- index.html
|- src/
|  |- components/
|  |- data/
|  |- pages/
|  |- styles/
|  |- main.js
|  |- utils.js
|- package.json
```

## Getting Started (Local Development)

### 1) Clone the repository

```bash
git clone https://github.com/shawreel24/LushaiTravels.git
cd LushaiTravels
```

### 2) Install dependencies

```bash
npm install
```

### 3) Run development server

```bash
npm run dev
```

Vite will print a local URL (usually `http://localhost:5173`).

## Build for Production

```bash
npm run build
```

The production files are generated in the `dist/` folder.

## Deploy to GitHub Pages

This project can be deployed through GitHub Actions (recommended).

### Step 1: Add Vite base path (required for project pages)

Create `vite.config.js` in the project root:

```js
import { defineConfig } from "vite";

export default defineConfig({
  base: "/LushaiTravels/",
});
```

For this repository, use:

`base: "/LushaiTravels/"`

### Step 2: Add GitHub Actions workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 3: Enable Pages in repository settings

In GitHub repository settings:

- Go to **Settings -> Pages**
- Under **Build and deployment**, choose **Source: GitHub Actions**

After pushing to `master`, GitHub will build and deploy automatically.

## Scripts

- `npm run dev` - Start local development server
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally

## Troubleshooting

- Blank page after deployment: ensure `base` in `vite.config.js` matches your repository name exactly.
- CSS/JS not loading on Pages: verify assets are built into `dist/` and deployed from that folder.
- 404 on refresh for nested routes: use hash-based routing or configure route fallback if you later add a router.

## Contributing

Contributions, suggestions, and improvements are welcome. Open an issue or submit a pull request.

## License

This project is open source. You can add an explicit license (for example, MIT) by creating a `LICENSE` file.
