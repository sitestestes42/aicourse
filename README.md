# AI Website Launch

Static site: no build step. Upload the folder to any static host (Netlify, Cloudflare Pages, Vercel, GitHub Pages).

- `index.html` — public landing page
- `app.html` — learning platform (dashboard, lessons, quizzes, tools)
- `js/config.js` — set `CHECKOUT_URL` and `PRICE` here
- `js/curriculum.js` — all 13 modules and the 11 achievements
- `js/mod00.js`, `mod01.js`, `mod02.js` — full content for Modules 00 to 02
- `js/app.js` — platform logic (progress, XP, quizzes, activities, tools)
- `js/videos.js` — **lesson videos**: one entry per lesson ID for all 13 modules, URLs empty until you add them
- `js/player.js` — the video player (direct files + YouTube), with placeholder, speed, volume, captions, fullscreen and resume

Progress is saved in the visitor's browser (localStorage).
To add a module, create `js/modNN.js` following `mod02.js`, include it in `app.html`, and set its `status` to `"live"` in `curriculum.js`.
Open locally with a simple server, for example `python3 -m http.server`, then visit `index.html`.

## Adding a lesson video
Open `js/videos.js`, find the lesson ID (`m1l2` = Module 01, lesson 2) and set `url`:

```js
m1l2: { url: "https://www.youtube.com/watch?v=VIDEO_ID", duration: 480 },
m1l3: { url: "videos/m1l3.mp4", captions: [{ src: "videos/m1l3-en.vtt", lang: "en", label: "English" }] },
```
Supported: YouTube links and direct .mp4 / .webm / .ogv files. Optional: `title`, `description`, `duration` (seconds), `poster`, `captions` (file videos only; YouTube uses its own CC button).
Leave `url` as `""` and the lesson shows a clear "No video for this lesson yet" placeholder. Watching a video never completes a lesson or awards XP.
Video position is saved in the same browser storage as the rest of the progress.
