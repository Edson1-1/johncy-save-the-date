# Images

## What to name your four photos

Copy them in here with exactly these names and nothing else needs changing:

| Filename | Where it appears | Shape |
|---|---|---|
| `groom.jpg` | Johncy's portrait | portrait, ~800×1000 |
| `bride.jpg` | Nithya's portrait | portrait, ~800×1000 |
| `photo-1.jpg` | hero banner **and** first polaroid | works best landscape |
| `photo-2.jpg` | second polaroid | square-ish |

`photo-1` is used twice because there are five image slots and four photos. Add a
fifth as `hero.jpg` and point `heroImage` at it in `config.js` if you'd rather the
banner were its own picture.

Different names are fine — just update the matching paths in `assets/js/config.js`.

## Until the real files land

The `.svg` files here are placeholders, and each one says on screen which slot it
is. Any photo that is missing or misnamed falls back to its placeholder
automatically, so the live site never shows a broken image.

## Sizes

**Keep each file under ~400 KB.** Straight off a phone they're 3–5 MB, which makes
the invitation crawl on mobile data — and the hero image blocks the first screen.

```bash
sips -Z 1600 IMG_1234.jpg --out photo-1.jpg     # macOS, built in
```

The gallery crops square and the portraits crop to a tall arch, so leave some room
around faces rather than cropping tight yourself.
