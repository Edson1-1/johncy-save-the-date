/* ============================================================
   Wedding invitation — behaviour.
   All content comes from assets/js/config.js (INVITE).
   You should not need to edit this file.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- derived values ---------- */
  const names = {
    ampersand: INVITE.groom.name + ' & ' + INVITE.bride.name,
    upper: (INVITE.groom.name + ' & ' + INVITE.bride.name).toUpperCase(),
    meet: 'Meet ' + INVITE.groom.name + ' & ' + INVITE.bride.name
  };
  const data = Object.assign({}, INVITE, {
    names: names,
    heroDateLine: INVITE.dateLong.replace(/^\w+,\s*/, '') + ' • ' + INVITE.timeDisplay,
    meta: {
      title: names.ampersand + ' | Wedding Invitation',
      description: 'You are warmly invited to celebrate the wedding of ' +
                   names.ampersand + ' on ' + INVITE.dateLong + '.'
    }
  });

  const get = (path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), data);

  // Read a config date in the wedding's time zone, not the viewer's, so the
  // countdown and the calendar files mean the same moment everywhere.
  const toDate = iso =>
    new Date(/(Z|[+-]\d{2}:?\d{2})$/.test(iso) ? iso : iso + (INVITE.utcOffset || ''));

  /* ---------- fill text & attributes from the config ---------- */
  document.querySelectorAll('[data-inv]').forEach(el => {
    const value = get(el.getAttribute('data-inv'));
    if (value != null) el.textContent = value;
  });
  document.querySelectorAll('[data-inv-attr]').forEach(el => {
    el.getAttribute('data-inv-attr').split(',').forEach(pair => {
      const [attr, path] = pair.split('|');
      const value = get(path.trim());
      if (value != null) el.setAttribute(attr.trim(), value);
    });
  });

  document.getElementById('hero').style.backgroundImage = "url('" + INVITE.heroImage + "')";

  // step the envelope signature down a size when the two names are long
  document.querySelectorAll('.env-names').forEach(el => {
    if (names.ampersand.length > 20) el.classList.add('is-long');
  });

  if (INVITE.credit && INVITE.credit.text) {
    const year = toDate(INVITE.dateISO).getFullYear();
    document.getElementById('footerCredit').innerHTML =
      '© ' + year + ' <a href="' + INVITE.credit.url + '" target="_blank" rel="noopener" ' +
      'style="color:inherit;text-decoration:none">' + INVITE.credit.text + '</a>';
  }

  /* ============================================================
     Envelope intro
     ============================================================ */
  const intro = document.getElementById('intro');
  const envelope = document.getElementById('envelope');
  const openBtn = document.getElementById('openInvitation');

  function openInvitation() {
    if (envelope.classList.contains('is-opening')) return;
    envelope.classList.add('is-opening');
    setTimeout(() => {
      intro.classList.add('is-open');
      document.body.classList.remove('is-locked');
      window.scrollTo({ top: 0, behavior: 'instant' });
      startMusic();
      setTimeout(() => intro.remove(), 1000);
    }, 1200);
  }
  openBtn.addEventListener('click', openInvitation);

  /* ============================================================
     Countdown
     ============================================================ */
  const target = toDate(INVITE.dateISO).getTime();
  const pad = n => String(n).padStart(2, '0');
  const fields = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
  };

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      Object.values(fields).forEach(el => el.textContent = '00');
      document.getElementById('countdown').classList.add('opacity-50');
      document.getElementById('countdownDone').classList.remove('d-none');
      clearInterval(timerId);
      return;
    }
    const s = Math.floor(diff / 1000);
    fields.days.textContent = pad(Math.floor(s / 86400));
    fields.hours.textContent = pad(Math.floor(s % 86400 / 3600));
    fields.minutes.textContent = pad(Math.floor(s % 3600 / 60));
    fields.seconds.textContent = pad(s % 60);
  }
  tick();
  const timerId = setInterval(tick, 1000);

  /* ============================================================
     Venue cards
     ============================================================ */
  const esc = str => String(str).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const venueList = document.getElementById('venueList');

  INVITE.events.forEach((ev, i) => {
    if (i > 0) {
      const route = document.createElement('div');
      route.className = 'venue-route reveal';
      route.innerHTML =
        '<span class="eyebrow">and then</span>' +
        '<span class="line"><i class="fas fa-heart"></i></span>' +
        '<em>we celebrate</em>';
      venueList.appendChild(route);
    }

    const wrap = document.createElement('div');
    wrap.className = 'reveal';
    wrap.innerHTML =
      '<article class="venue-card">' +
        '<div class="venue-emblem"><i class="fas ' + esc(ev.icon) + '"></i></div>' +
        '<span class="venue-chapter">' + esc(ev.chapter) + '</span>' +
        '<h3 class="venue-title serif">' + esc(ev.title) + '</h3>' +
        '<div class="venue-time' + (ev.timeSuffix ? '' : ' is-text') + '">' + esc(ev.time) +
          (ev.timeSuffix ? '<small>' + esc(ev.timeSuffix) + '</small>' : '') +
        '</div>' +
        '<ul class="venue-details">' +
          '<li><i class="fas ' + esc(ev.venueIcon) + '"></i><div><small>' + esc(ev.venueLabel) +
            '</small><span>' + esc(ev.venueName) + '</span></div></li>' +
          '<li><i class="far fa-calendar"></i><div><small>Date</small><span>' +
            esc(INVITE.dateLong) + '</span></div></li>' +
        '</ul>' +
        '<div class="venue-actions">' +
          '<a href="https://maps.google.com/?q=' + encodeURIComponent(ev.mapQuery) + '" target="_blank" rel="noopener" ' +
            'class="btn btn-sm bg-olive text-gold border-gold rounded-pill w-100 py-2 fw-bold shimmer" ' +
            'style="font-size:.7rem;letter-spacing:.1em;text-transform:uppercase">' +
            '<i class="fas fa-directions me-1"></i> Get directions</a>' +
          '<div class="dropdown">' +
            '<button class="btn btn-sm btn-light border-gold text-olive-dark rounded-pill w-100 py-2 fw-bold dropdown-toggle" ' +
              'type="button" data-bs-toggle="dropdown" style="font-size:.7rem">' +
              '<i class="far fa-calendar-plus me-1 text-gold"></i> Add to calendar</button>' +
            '<ul class="dropdown-menu dropdown-menu-end shadow border-gold w-100">' +
              '<li><button class="dropdown-item py-2" data-cal="google" data-idx="' + i + '" style="font-size:.8rem">' +
                '<i class="fab fa-google text-danger me-2"></i>Google Calendar</button></li>' +
              '<li><button class="dropdown-item py-2" data-cal="ics" data-idx="' + i + '" style="font-size:.8rem">' +
                '<i class="fas fa-file-download text-primary me-2"></i>Apple / Outlook (.ics)</button></li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
      '</article>';
    venueList.appendChild(wrap);
  });

  /* ---------- calendar helpers ---------- */
  const stamp = iso => toDate(iso).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  function eventTitle(ev) {
    return ev.calendarTitle + ' — ' + names.ampersand;
  }

  venueList.addEventListener('click', e => {
    const btn = e.target.closest('[data-cal]');
    if (!btn) return;
    const ev = INVITE.events[Number(btn.dataset.idx)];
    const title = eventTitle(ev);

    if (btn.dataset.cal === 'google') {
      const url = 'https://calendar.google.com/calendar/render?action=TEMPLATE' +
        '&text=' + encodeURIComponent(title) +
        '&dates=' + stamp(ev.calStart) + '/' + stamp(ev.calEnd) +
        '&location=' + encodeURIComponent(ev.venueName) +
        '&details=' + encodeURIComponent('We would love to have you with us.');
      window.open(url, '_blank', 'noopener');
      return;
    }

    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Wedding Invitation//EN',
      'BEGIN:VEVENT',
      'UID:' + Date.now() + '@wedding-invitation',
      'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      'DTSTART:' + stamp(ev.calStart),
      'DTEND:' + stamp(ev.calEnd),
      'SUMMARY:' + title,
      'LOCATION:' + ev.venueName.replace(/,/g, '\\,'),
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = ev.calendarTitle.replace(/\s+/g, '-').toLowerCase() + '.ics';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  });

  /* ============================================================
     Scatter gallery
     ============================================================ */
  const board = document.getElementById('scatterBoard');
  const photos = INVITE.gallery;

  // Positions in % of the board, plus a tilt. Reused cyclically for longer galleries.
  const layouts = {
    desktop: [
      { x: 17, y: 28, r: -8 }, { x: 50, y: 23, r: 4 },  { x: 83, y: 29, r: -5 },
      { x: 24, y: 72, r: 6 },  { x: 53, y: 70, r: -3 }, { x: 80, y: 74, r: 7 }
    ],
    mobile: [
      { x: 29, y: 13, r: -6 }, { x: 71, y: 24, r: 6 },
      { x: 30, y: 45, r: 4 },  { x: 70, y: 56, r: -6 },
      { x: 29, y: 77, r: -3 }, { x: 71, y: 88, r: 5 }
    ]
  };
  const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

  const cards = photos.map((photo, i) => {
    const card = document.createElement('figure');
    card.className = 'polaroid m-0';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'View photo: ' + photo.caption);
    card.style.zIndex = String(10 + i);
    card.innerHTML =
      '<img src="' + esc(photo.src) + '" alt="' + esc(photo.caption) + '" loading="lazy" decoding="async">' +
      '<figcaption>' + esc(photo.caption) + '</figcaption>';
    card.addEventListener('click', () => openLightbox(i));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); }
    });
    board.appendChild(card);
    return card;
  });

  function placeCards(animated) {
    const set = isMobile() ? layouts.mobile : layouts.desktop;
    cards.forEach((card, i) => {
      const spot = set[i % set.length];
      // nudge repeats so a 7th+ photo does not land exactly on the 1st
      const lap = Math.floor(i / set.length);
      const x = spot.x + lap * 4;
      const y = spot.y + lap * 3;
      card.style.left = x + '%';
      card.style.top = y + '%';
      card.style.transform = 'translate(-50%,-50%) rotate(' + spot.r + 'deg) scale(' +
        (animated ? 1 : 0.6) + ')';
    });
  }
  placeCards(false);

  const galleryObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      cards.forEach((card, i) => {
        setTimeout(() => card.classList.add('is-in'), i * 120);
      });
      setTimeout(() => placeCards(true), 60);
      galleryObserver.disconnect();
    });
  }, { threshold: 0.2 });
  galleryObserver.observe(board);

  let resizeId;
  addEventListener('resize', () => {
    clearTimeout(resizeId);
    resizeId = setTimeout(() => placeCards(cards[0].classList.contains('is-in')), 180);
  });

  /* ---------- lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCaption = document.getElementById('lbCaption');
  let lbIndex = 0;

  function openLightbox(i) {
    show(i);
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function show(i) {
    lbIndex = (i + photos.length) % photos.length;
    lbImg.src = photos[lbIndex].src;
    lbImg.alt = photos[lbIndex].caption;
    lbCaption.textContent = photos[lbIndex].caption;
  }
  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbPrev').addEventListener('click', () => show(lbIndex - 1));
  document.getElementById('lbNext').addEventListener('click', () => show(lbIndex + 1));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  addEventListener('keydown', e => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') show(lbIndex - 1);
    if (e.key === 'ArrowRight') show(lbIndex + 1);
  });

  /* ============================================================
     Scroll reveal
     ============================================================ */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ============================================================
     WhatsApp share
     ============================================================ */
  function share() {
    const url = location.href.split('#')[0];
    const lines = [
      'With joy, we invite you to celebrate the beginning of our forever. 💍',
      '',
      '📅 ' + INVITE.dateLong + ' at ' + INVITE.timeDisplay
    ];
    INVITE.events.forEach(ev => lines.push('📍 ' + ev.title + ': ' + ev.venueName));
    lines.push('', 'The full invitation is here:', url);
    window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
  }
  document.getElementById('shareHero').addEventListener('click', share);
  document.getElementById('shareFooter').addEventListener('click', share);

  /* ============================================================
     Background music (only if INVITE.music is set)
     ============================================================ */
  const audio = document.getElementById('weddingAudio');
  const audioBtn = document.getElementById('audioToggle');
  const audioIcon = document.getElementById('audioIcon');
  const audioLabel = document.getElementById('audioLabel');

  function startMusic() {
    if (!INVITE.music) return;
    audio.play().then(setPlaying).catch(() => setPaused());  // autoplay may be blocked
  }
  function setPlaying() { audioIcon.className = 'fas fa-pause'; audioLabel.textContent = 'Pause music'; }
  function setPaused()  { audioIcon.className = 'fas fa-music'; audioLabel.textContent = 'Play music'; }

  if (INVITE.music) {
    audio.src = INVITE.music;
    audioBtn.classList.add('is-available');
    audioBtn.addEventListener('click', () => {
      if (audio.paused) { audio.play().then(setPlaying).catch(setPaused); }
      else { audio.pause(); setPaused(); }
    });
  }

  /* ============================================================
     Falling petals
     ============================================================ */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const petals = document.getElementById('petals');
    const glyphs = ['fa-leaf', 'fa-seedling', 'fa-star'];
    for (let i = 0; i < 14; i++) {
      const petal = document.createElement('i');
      petal.className = 'fas ' + glyphs[i % glyphs.length] + ' petal';
      petal.style.left = Math.random() * 100 + '%';
      petal.style.fontSize = (8 + Math.random() * 10) + 'px';
      petal.style.animationDuration = (13 + Math.random() * 14) + 's';
      petal.style.animationDelay = (-Math.random() * 20) + 's';
      petals.appendChild(petal);
    }
  }
})();
