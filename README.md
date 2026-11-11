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

This repo is already live at **https://edson1-1.github.io/johncy-save-the-date/**

Pages serves the `gh-pages` branch, and
[`.github/workflows/publish.yml`](.github/workflows/publish.yml) mirrors `main` onto
it on every push. So the whole workflow is:

```bash
git add -A && git commit -m "Update the invitation" && git push
```

Give it about a minute and the live site updates.

### Setting this up on a fresh repo

Creating a `gh-pages` branch switches Pages on by itself, which avoids needing
repo-admin rights:

```bash
git push origin main:refs/heads/gh-pages
```

The alternative — **Settings → Pages → Source: GitHub Actions**, deploying with
`actions/deploy-pages` — is tidier, but a workflow can't enable Pages on its own
(`Create Pages site failed: Resource not accessible by integration`), so the first
switch has to be flipped by hand in the UI. The `gh-pages` route needs no settings
at all.

### Custom domain

The site is served at **https://johncywedsnithya.com** via the `CNAME` file at the
repo root.

That file must stay on `main`. The Pages "Custom domain" field in repo settings
writes a `CNAME` onto the `gh-pages` branch instead, and this repo's workflow
force-pushes `main` over `gh-pages` on every push — so a `CNAME` written that way
is wiped by the next commit.

DNS at the registrar (Squarespace) is four A records on `@`:

```
185.199.108.153   185.199.109.153   185.199.110.153   185.199.111.153
```

plus a CNAME on `www` to `edson1-1.github.io`.

### Link previews

The `og:` tags in `index.html` are written out in full rather than filled in by
`main.js`, because WhatsApp and other crawlers don't run JavaScript. **If the
names or date change in `config.js`, update the `<head>` of `index.html` too** —
otherwise shared links keep showing the old details.
