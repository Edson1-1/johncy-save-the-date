/* ============================================================
   WEDDING INVITATION — EDIT EVERYTHING HERE
   This is the only file you need to change for a new couple.
   Replace the images in assets/images/ keeping the same names,
   or point these paths at your own files (.jpg / .png / .webp).
   ============================================================ */

const INVITE = {

  /* ---------- The couple ---------- */
  groom: {
    name: 'Johncy',
    shortName: 'Johncy',
    initial: 'J',
    role: 'The Groom',
    photo: 'assets/images/groom.svg'          // PLACEHOLDER — portrait, ~800x1000
  },
  bride: {
    name: 'Nithya',
    shortName: 'Nithya',
    initial: 'N',
    role: 'The Bride',
    photo: 'assets/images/bride.svg'          // PLACEHOLDER — portrait, ~800x1000
  },

  /* ---------- Date & time ---------- */
  // The wedding's own time zone, as a UTC offset. India +05:30, UK +00:00,
  // US Eastern -05:00 ... Without it, the countdown and the calendar entries
  // would shift for guests whose phone is set to another time zone.
  utcOffset: '+05:30',

  // ISO date-time of the ceremony. Drives the countdown.
  dateISO: '2026-12-27T11:00:00',   // TODO: confirm the ceremony time
  dateLong: 'Sunday, December 27th, 2026',
  dateShort: '27 December 2026',
  dateUpper: 'SUNDAY, DECEMBER 27, 2026',
  timeDisplay: '11:00 AM',

  /* ---------- Words ---------- */
  tagline: '"Blessed to begin as one."',
  heroKicker: 'With love in our hearts, we invite you to celebrate our forever',
  introKicker: 'A little note, sealed with love',
  envelopeLine: 'You are warmly invited to celebrate',
  story: 'With hearts full of love and gratitude, we invite you to celebrate the beginning ' +
         'of our forever. Somewhere between a simple hello and a shared cup of tea, our story ' +
         'began — and now, with the blessings of God and the love of our families, we are ready ' +
         'to take the next step together.',
  thankYouNote: '"With love in our hearts, we thank you for your blessings, prayers and constant ' +
                'support as we celebrate our forever."',
  hashtag: '#JohncyWedsNithya',

  /* ---------- Images ---------- */
  heroImage: 'assets/images/hero.svg',        // PLACEHOLDER — wide banner, ~1920x1280

  /* ---------- Background music (optional) ---------- */
  // Drop an .mp3 in assets/audio/ and put the path here. Leave '' to hide the player.
  music: '',

  /* ---------- The events ---------- */
  events: [
    {
      chapter: 'Chapter I',
      title: 'The Ceremony',
      icon: 'fa-ring',
      time: '11:00',
      timeSuffix: 'AM',
      venueLabel: 'Church',
      venueIcon: 'fa-church',
      venueName: 'VENUE NAME, Street / Town, District',
      mapQuery: 'VENUE NAME Town District',       // used for the Google Maps link
      calendarTitle: 'Wedding Ceremony',
      calStart: '2026-12-27T11:00:00',
      calEnd: '2026-12-27T13:00:00'
    },
    {
      chapter: 'Chapter II',
      title: 'The Reception',
      icon: 'fa-glass-cheers',
      time: 'Following the Ceremony',
      timeSuffix: '',                              // empty => time shown as plain text
      venueLabel: 'Hall',
      venueIcon: 'fa-building',
      venueName: 'RECEPTION HALL NAME, Town',
      mapQuery: 'RECEPTION HALL NAME Town',
      calendarTitle: 'Wedding Reception',
      calStart: '2026-12-27T13:00:00',
      calEnd: '2026-12-27T17:00:00'
    }
  ],

  /* ---------- Gallery ---------- */
  // Add or remove freely — the scatter layout adapts.
  gallery: [
    { src: 'assets/images/gallery-1.svg', caption: 'A Look That Says Forever' },
    { src: 'assets/images/gallery-2.svg', caption: 'Wrapped in Love' },
    { src: 'assets/images/gallery-3.svg', caption: 'Side by Side' },
    { src: 'assets/images/gallery-4.svg', caption: 'Our Beautiful Beginning' },
    { src: 'assets/images/gallery-5.svg', caption: 'One Step Closer' },
    { src: 'assets/images/gallery-6.svg', caption: 'Happily Ever After' }
  ],

  /* ---------- Credit line in the footer ---------- */
  credit: { text: '', url: '' }
};
