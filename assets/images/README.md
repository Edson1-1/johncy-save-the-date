# Images

## What's in use

| File | Where it appears | Config key |
|---|---|---|
| `Hero.jpeg` | full-screen banner | `heroImage` |
| `img1.jpeg` | the "Meet Johncy & Nithya" photo | `couplePhoto` |
| `img2.jpeg` | first polaroid | `gallery[0]` |
| `img3.jpeg` | second polaroid | `gallery[1]` |

All four are photos of the two of them, so the couple section shows one shared
photo rather than a portrait each. To switch to a portrait each, add solo photos
as `groom.jpg` and `bride.jpg` and set `couplePhoto: ''` in `config.js`.

## Swapping a photo

Drop the new file in here and change its path in `assets/js/config.js`. Any photo
that is missing or misnamed falls back to a labelled placeholder, so the live
site never shows a broken image.

## Sizes

Keep each file under ~400 KB — straight off a phone they're 3–5 MB, which makes
the invitation crawl on mobile data.

```bash
sips -Z 1600 IMG_1234.jpg --out photo.jpg     # macOS, built in
```

The gallery crops square and the couple photo crops to a tall arch, so leave
some room around faces rather than cropping tight yourself.
