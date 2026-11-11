# Audio

Drop the background track here, then point `music` in `assets/js/config.js` at it:

```js
music: 'assets/audio/song.mp3',
```

Leave `music: ''` and the player button stays hidden.

- **Format:** `.mp3` plays everywhere. `.m4a` and `.ogg` do not.
- **Size:** keep it under ~3 MB. Guests open this on mobile data, and the file
  downloads before it plays. A 2–3 minute clip at 128 kbps is about right —
  a full-length song at 320 kbps is not.
- The track starts when someone opens the envelope. Browsers block autoplay
  until a tap, which the envelope provides, so this works — but if a browser
  still refuses, the button in the corner starts it.
