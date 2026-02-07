# Deployment Guide

Deploying your **Career Multiverse Explorer** is straightforward! Since this is a Vite + React application, you can deploy it for free on platforms like **Vercel** or **Netlify**.

## Option 1: Vercel (Recommended)

Vercel is the easiest way to deploy React apps.

### Prerequisites
1.  A [GitHub](https://github.com/) account.
2.  Push your code to a GitHub repository.

### Steps
1.  **Sign Up/Login** to [Vercel](https://vercel.com).
2.  Click **"Add New..."** -> **"Project"**.
3.  **Import Git Repository**: connect your GitHub account and select your `career-multiverse-explorer` repo.
4.  **Configure Project**:
    *   **Framework Preset**: Vite (should happen automatically).
    *   **Root Directory**: `./` (leave default).
    *   **Build Command**: `npm run build` (leave default).
    *   **Output Directory**: `dist` (leave default).
5.  Click **Deploy**.

🎉 Your app will be live in seconds!

## Option 2: Netlify

Netlify is another excellent option for static sites.

### Steps
1.  **Sign Up/Login** to [Netlify](https://www.netlify.com/).
2.  Click **"Add new site"** -> **"Import an existing project"**.
3.  Connect to **GitHub**.
4.  Select your repository.
5.  **Build Settings**:
    *   **Build command**: `npm run build`
    *   **Publish directory**: `dist`
6.  Click **Deploy site**.

## Option 3: Manual Hosting (GitHub Pages / Traditional)

If you want to host it manually or on a shared server:

1.  Run the build command locally:
    ```bash
    npm run build
    ```
2.  This generates a `dist` folder containing `index.html`, CSS, and JS files.
3.  Upload the contents of the `dist` folder to your web server's public directory (e.g., `public_html`).

### Note for Client-Side Routing
If you refresh a page on a deployed SPA (Single Page App) and get a 404 error, you need to configure your host to rewrite all requests to `index.html`.
*   **Vercel/Netlify**: Handles this automatically.
*   **Manual**: You may need an `.htaccess` or nginx config to direct all traffic to `index.html`.
