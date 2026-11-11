# Images

Replace the `.svg` placeholders here with real photos, then update the matching
paths in `assets/js/config.js`. The placeholders say on screen which file they are.

| Config key | Placeholder | Used for | Shape |
|---|---|---|---|
| `heroImage` | `hero.svg` | full-screen banner | landscape, ~1600×1067 |
| `groom.photo` | `groom.svg` | groom's portrait | portrait, ~800×1000 |
| `bride.photo` | `bride.svg` | bride's portrait | portrait, ~800×1000 |
| `gallery[].src` | `gallery-1…6.svg` | polaroid gallery | square, ~900×900 |

Drop files in with any name — `hero.jpg`, `johncy.jpg`, whatever — and set the
path in `config.js` to match. Add or remove `gallery[]` entries freely; the
scatter layout adapts to however many there are.

**Keep each file under ~400 KB.** Guests open this on mobile data, and the hero
image blocks the first screen. Resizing a phone photo to 1600px wide and saving
at JPEG quality 80 usually lands around 200 KB with no visible loss:

```bash
sips -Z 1600 photo.jpg --out hero.jpg          # macOS, built in
```

The gallery crops to a square and the portraits crop to a tall arch, so leave a
little room around faces rather than cropping tight yourself.
