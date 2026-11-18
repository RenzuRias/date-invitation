# Date Invitation Website

A responsive static website built with HTML, CSS, and vanilla JavaScript. Visitors can choose one or more date ideas, which are displayed on the final overview screen. Answers are not sent or stored anywhere. It can be hosted for free on GitHub Pages, Netlify, Cloudflare Pages, or any static host.

## Preview locally

You can open `index.html` directly, or serve the folder through a local web server:

```powershell
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deploy free with Netlify

1. Sign in at Netlify.
2. Choose **Add new site → Deploy manually**.
3. Drag the entire `date-invite` folder into the upload area.

Netlify will publish the site and provide a free shareable URL.

## Deploy free with GitHub Pages

1. Create a new GitHub repository and upload these files to the repository root.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose the `main` branch and `/ (root)`, then save.

GitHub will provide the public URL after deployment finishes.
