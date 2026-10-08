# AI Website Launch

Static site: no build step. Upload the folder to any static host (Netlify, Cloudflare Pages, Vercel, GitHub Pages).

- `index.html` — public landing page
- `app.html` — learning platform (dashboard, lessons, quizzes, tools, certificate)
- `js/config.js` — set `CHECKOUT_URL` and `PRICE` here
- `js/curriculum.js` — all 13 modules and the 11 achievements
- `js/mod00.js`, `mod01.js`, `mod02.js` — full content for Modules 00 to 02
- `js/app.js` — platform logic (progress, XP, quizzes, activities, tools)

Progress is saved in the visitor's browser (localStorage).
To add a module, create `js/modNN.js` following `mod02.js`, include it in `app.html`, and set its `status` to `"live"` in `curriculum.js`.
Open locally with a simple server, for example `python3 -m http.server`, then visit `index.html`.
