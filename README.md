# Wedding Invitation

A single-page wedding invitation: envelope intro, hero banner, live countdown,
couple profiles, venue cards with directions and "add to calendar", a scattered
polaroid gallery with a lightbox, WhatsApp sharing, and an optional music player.

Plain HTML/CSS/JS — no build step, no dependencies to install.

---

## 1. Personalise it

**Everything you need to edit lives in [`assets/js/config.js`](assets/js/config.js).**
Open it and change the names, dates, words, venues and gallery captions. Nothing
else in the project needs touching.

| What | Where in `config.js` |
|---|---|
| Names, initials, portraits | `groom`, `bride` |
| Countdown target + the dates shown on screen | `dateISO`, `dateLong`, `dateShort`, `dateUpper`, `timeDisplay` |
| The wedding's time zone | `utcOffset` (e.g. `'+05:30'` for India) |
| Tagline, story, thank-you note, hashtag | `tagline`, `story`, `thankYouNote`, `hashtag` |
| Ceremony / reception cards, maps links, calendar entries | `events[]` |
| Gallery photos + captions | `gallery[]` |
| Background music (optional) | `music` |

`dateISO` drives the countdown; the other date fields are only what's printed,
so keep them in step with it. `utcOffset` is the wedding's own time zone — set it
and the countdown and the calendar entries mean the same moment for a guest in
Kerala and a guest in London.

## 2. Replace the images

`assets/images/` ships with SVG placeholders so the page looks complete right away.
Drop your own photos in and point `config.js` at them:

| Placeholder | Used for | Suggested size |
|---|---|---|
| `hero.svg` | full-screen banner | 1600 × 1067 (landscape) |
| `groom.svg` / `bride.svg` | couple portraits | 800 × 1000 (portrait) |
| `gallery-1…6.svg` | polaroid gallery | 900 × 900 (square) |

The simplest route: add `hero.jpg`, `groom.jpg` … next to the placeholders, then
change the matching paths in `config.js` (e.g. `heroImage: 'assets/images/hero.jpg'`).
Keep photos under ~400 KB each — guests will open this on mobile data.

Add or remove entries in `gallery[]` freely; the scatter layout adapts.

### Music (optional)
Put an `.mp3` in `assets/audio/` and set `music: 'assets/audio/your-song.mp3'`.
Leave it as `''` and the player button stays hidden. Browsers block autoplay
until someone interacts, so the track starts when the envelope is opened — and
if the browser refuses, the button still works.

## 3. Preview locally

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. (Opening `index.html` directly via `file://`
mostly works, but a local server matches how Pages serves it.)

## 4. Deploy to GitHub Pages

1. Create a repository on GitHub and push this folder to the `main` branch:

   ```bash
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```

2. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

3. That's it. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) publishes
   the site on every push to `main`. The live URL appears in **Settings → Pages** and
   on the workflow run, and will be `https://<you>.github.io/<repo>/`.

All asset paths are relative, so the site works from a project sub-path
(`/<repo>/`) as well as from a custom domain.

### Custom domain
Add a file named `CNAME` at the repo root containing just your domain
(e.g. `wedding.example.com`), then point a CNAME DNS record at `<you>.github.io`.

## Structure

```
index.html              markup
assets/css/style.css    theme — olive & gold palette lives in :root
assets/js/config.js     ← all the content
assets/js/main.js       behaviour (countdown, gallery, calendar, share)
assets/images/          image placeholders
.github/workflows/      GitHub Pages deployment
.nojekyll               tells Pages to serve files as-is
```

## Changing the colours

Every colour is a CSS variable at the top of `assets/css/style.css`:

```css
:root {
  --olive-dark: #3F4A3C;
  --olive:      #5A6B56;
  --gold:       #C5A059;
  --cream:      #F4EFE6;
  ...
}
```

Swap those five or six values and the whole invitation re-themes.
