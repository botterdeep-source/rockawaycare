# Rockaway Seasonal Care

A lightweight, mobile-friendly, one-page link-in-bio website. It uses plain HTML, CSS and JavaScript, so there is no build step or framework required.

## Edit your images

Put your own image files in `assets/images/` and use these exact filenames:

| File | Used for |
|---|---|
| `logo.png` | Circular business logo |
| `background.jpg` | Page background image |
| `fall-before.jpg` | Fall cleanup before photo |
| `fall-after.jpg` | Fall cleanup after photo |
| `lawn-before.jpg` | Lawn care before photo |
| `lawn-after.jpg` | Lawn care after photo |
| `car-before.jpg` | Car detailing before photo |
| `car-after.jpg` | Car detailing after photo |

The logo should be a square PNG with a transparent background if possible. Use a wide, high-resolution background image (around 1920×1080 or larger). JPG, PNG and WebP all work if you also change the matching file extension in `index.html` or `styles.css`.

The background is configured in `styles.css` at the top in `--page-image`. The logo and gallery paths are in `index.html`.

## Change prices and services

Edit the `pricing` object near the top of `script.js`. The service list and starting prices shown above the calculator are in `index.html`.

## Quote form

The quote form submits to Formspree using the existing endpoint:
`https://formspree.io/f/xbggbpjv`

To use a different Formspree form, replace `formspreeEndpoint` at the top of `script.js`.

## Preview locally

Open `index.html` in a browser. For a local web server, run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Host with GitHub Pages

1. Create a new GitHub repository, for example `rockaway-seasonal-care-bio`.
2. Upload all files and folders from this project. Keep the folder structure.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose branch `main` and folder `/ (root)`, then save.
6. Wait for GitHub Pages to publish the site. Your public URL will appear in the Pages settings.

This is a static site. You do not need Node.js, npm, a server, or a paid hosting plan.
