// Lista kamer: z niej powstają kafle i lista dla wyszukiwarek (JSON-LD). Dodanie kamery to jedna linia.
// region '' = kafel dotyczy całych Beskidów; scaled = strona rysowana w rozmiarze desktopowym i pomniejszana.
const CAMERAS = [
  { cat: 'bike', region: 'bielsko', name: 'Szyndzielnia – Schronisko', src: 'https://imageserver.webcamera.pl/umiesc/szyndzielnia' },
  { cat: 'bike', region: 'bielsko', name: 'Szyndzielnia – Polana', src: 'https://embed.widoki.tv/?camera=szyndzielnia' },
  { cat: 'bike', region: 'bielsko', name: 'Szyndzielnia – Wieża ZIAD Tower', src: 'https://kamery.euro-lan.pl:8080/stream/stream.html?src=kamera1&mode=webrtc,mse,hls,mjpeg&autoplay=true&muted=true' },
  { cat: 'bike', region: 'bielsko', name: 'Szyndzielnia – Kolej linowa', src: 'https://kamery.euro-lan.pl:8080/stream/stream.html?src=kamera3&mode=webrtc,mse,hls,mjpeg&autoplay=true&muted=true' },
  { cat: 'bike', region: 'bielsko', name: 'Magurka Wilkowicka', src: 'https://streaming.ovh/Magurka/embed.html' },
  { cat: 'bike', region: 'szczyrk', name: 'Szczyrk – Gondola SMR', src: 'https://imageserver.webcamera.pl/umiesc/szczyrk-gondola' },
  { cat: 'bike', region: 'wisla', name: 'Wisła – Skolnity Ski&Bike', src: 'https://imageserver.webcamera.pl/umiesc/skolnity-2' },
  { cat: 'bike', region: 'wisla', name: 'Wisła – Skolnity, wieża widokowa', src: 'https://imageserver.webcamera.pl/umiesc/skolnity-wieza-widokowa' },
  { cat: 'bike', region: 'wisla', name: 'Czantoria – kolej', src: 'https://imageserver.webcamera.pl/umiesc/czantoria3' },
  { cat: 'bike', region: 'maly', name: 'Góra Żar – kolej PKL', src: 'https://imageserver.webcamera.pl/umiesc/gorazar' },
  { cat: 'bike', region: 'maly', name: 'Góra Żar – panorama', src: 'https://imageserver.webcamera.pl/umiesc/gorazar2' },
  { cat: 'snow', region: 'bielsko', name: 'Dębowiec – górna stacja', src: 'https://stream.bbosir.bielsko.pl:8888/stok_gorna/' },
  { cat: 'snow', region: 'bielsko', name: 'Dębowiec – dolna stacja', src: 'https://stream.bbosir.bielsko.pl:8888/stok_dolna/' },
  { cat: 'snow', region: 'szczyrk', name: 'Skrzyczne – FIS', src: 'https://imageserver.webcamera.pl/umiesc/cos-szczyrk-jaworzyna' },
  { cat: 'snow', region: 'szczyrk', name: 'Skrzyczne – szczyt', src: 'https://imageserver.webcamera.pl/umiesc/cos-szczyrk' },
  { cat: 'snow', region: 'szczyrk', name: 'Małe Skrzyczne – Hala Skrzeczeńska', src: 'https://imageserver.webcamera.pl/umiesc/szczyrk-hala-skrzyczenska-2' },
  { cat: 'snow', region: 'szczyrk', name: 'Solisko', src: 'https://imageserver.webcamera.pl/umiesc/szczyrk-solisko' },
  { cat: 'snow', region: 'szczyrk', name: 'Szczyrk – Zbójnicka Kopa', src: 'https://imageserver.webcamera.pl/umiesc/szczyrk-zbojnicka-kopa' },
  { cat: 'snow', region: 'szczyrk', name: 'Szczyrk – Beskid Sport Arena', src: 'https://imageserver.webcamera.pl/umiesc/beskidsport' },
  { cat: 'snow', region: 'zywiecki', name: 'Pilsko – Miziowa', src: 'https://video.itcom.pl/korbielow1/embed.html' },
  { cat: 'snow', region: 'zywiecki', name: 'Zawoja – Mosorny Groń', src: 'https://imageserver.webcamera.pl/umiesc/zawoja' },
  { cat: 'snow', region: 'wisla', name: 'Klepki', src: 'https://polineo.pl:5443/LiveApp/play.html?name=Q8aJqj0p7sUXGep15093231011287407' },
  { cat: 'snow', region: 'wisla', name: 'Wisła – Cieńków', src: 'https://imageserver.webcamera.pl/umiesc/wisla-cienkow' },
  { cat: 'snow', region: 'wisla', name: 'Istebna – Złoty Groń', src: 'https://imageserver.webcamera.pl/umiesc/zlotygron' },
  { cat: 'snow', region: 'szczyrk', name: 'Biały Krzyż', src: 'https://imageserver.webcamera.pl/umiesc/bialy-krzyz' },
  { cat: 'snow', region: 'zywiecki', name: 'Zwardoń Ski', src: 'https://imageserver.webcamera.pl/umiesc/zwardon-ski' },
  { cat: 'snow', region: 'maly', name: 'Rzyki – Czarny Groń', src: 'https://imageserver.webcamera.pl/umiesc/czarnygron-stok2' },
  { cat: 'snow', region: 'wisla', name: 'Czantoria', src: 'https://player.webcamera.pl/czantoria_cam_2321a8' },
  { cat: 'snow', region: 'wisla', name: 'Lisia Polana', src: 'https://imageserver.webcamera.pl/umiesc/lisia-polana-ustron-kamera' },
  { cat: 'weather', region: '', name: 'Windy', src: 'https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=default&metricWind=default&zoom=8&overlay=radar&product=ecmwf&level=surface&lat=49.873&lon=19.164' },
  { cat: 'weather', region: '', name: 'meteo.pl, Bielsko-Biała', src: 'https://app.meteo.pl/meteogram/49.82,19.04', scaled: true },
];

const q = document.getElementById('q');
const TAGS = { bike: 'Bike', snow: 'Snow', weather: 'Pogoda' };
const cardTpl = document.getElementById('card-tpl');
const items = CAMERAS.map(cam => {
  const card = cardTpl.content.firstElementChild.cloneNode(true);
  Object.assign(card.dataset, { cat: cam.cat, region: cam.region, name: cam.name });
  const frame = card.querySelector('iframe');
  frame.title = `Kamera: ${cam.name}`;
  frame.dataset.src = cam.src;
  frame.classList.toggle('frame-scaled', !!cam.scaled);
  card.querySelector('.frame-click-mask').setAttribute('aria-label', `Otwórz podgląd: ${cam.name}`);
  card.querySelector('.label').textContent = cam.name;
  card.querySelector('.tag').textContent = TAGS[cam.cat];
  document.querySelector(`.grid[data-cat="${cam.cat}"]`).append(card);
  return card;
});
const chips = [...document.querySelectorAll('.chip[data-filter]')];
const regionChips = [...document.querySelectorAll('.chip[data-region]')];
const lazyFrames = [...document.querySelectorAll('iframe.lazy-iframe')];
// Zmiana src istniejącej ramki dopisuje wpis do historii przeglądarki (Wstecz cofałby wewnątrz ramki).
// Dlatego ramkę podmieniamy na świeżą kopię z nowym adresem – nowy element nie zostawia śladu w historii.
function swapFrameSrc(frame, url) {
  if (!frame) return frame;
  if ((frame.getAttribute('src') || '') === (url || '')) return frame;
  const fresh = frame.cloneNode(false);
  const wrap = frame.parentElement;
  wrap?.classList.remove('is-loaded');
  if (url) {
    fresh.src = url;
    // Pokaż ramkę po załadowaniu (albo po 10 s, gdyby load nie nadszedł)
    const reveal = () => { if (fresh.isConnected) wrap?.classList.add('is-loaded'); };
    fresh.addEventListener('load', reveal, { once: true });
    setTimeout(reveal, 10000);
  } else {
    fresh.removeAttribute('src');
  }
  frame.replaceWith(fresh);
  return fresh;
}
const emptyState = document.getElementById('empty');
let activeFilter = 'all';
let activeRegion = 'all';

const camModal = document.getElementById('cam-modal');
const camModalClose = camModal.querySelector('.cam-modal-close');
let camModalIframe = document.getElementById('cam-modal-iframe');
const camModalLabel = document.getElementById('cam-modal-label');
let currentModalIndex = -1;

const FAV_STORAGE_KEY = 'abc:favorites:v1';
const loadFavs = () => {
  try {
    const raw = localStorage.getItem(FAV_STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch (_) {
    return new Set();
  }
};
const saveFavs = (set) => {
  try {
    localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify([...set]));
  } catch (_) {}
};

const slug = (s) => (s || '')
  .toLowerCase()
  .trim()
  .replace(/[\u2013\u2014]/g, '-')   // – —
  .replace(/[^a-z0-9ąćęłńóśżź -]/gi, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-')
  .replace(/^-|-$/g, '');

const getItemId = (el, srcOverride) => {
  const name = el.dataset.name || '';
  const cat = el.dataset.cat || '';
  const src = srcOverride || el.querySelector('iframe')?.dataset?.src || el.querySelector('iframe')?.getAttribute('src') || '';
  const srcKey = src ? src.replace(/^https?:\/\//, '').slice(0, 80) : '';
  return `${slug(cat)}:${slug(name)}:${slug(srcKey)}`;
};

// Kamery webcamera.pl osadzamy bezpośrednio (bez przekierowania z player.webcamera.pl,
// które dopisywało wpis do historii). Stare ID ulubionych przenosimy na nowe adresy.
// shortcut: migracja z 2026-11-09, do usunięcia po 2027-05 (kto nie wejdzie do tego czasu, straci ulubione).
const LEGACY_SRC = {
  'https://imageserver.webcamera.pl/umiesc/szyndzielnia': 'https://player.webcamera.pl/enet24_cam_a07089',
  'https://imageserver.webcamera.pl/umiesc/cos-szczyrk-jaworzyna': 'https://player.webcamera.pl/cos_cam_0e193b',
  'https://imageserver.webcamera.pl/umiesc/szczyrk-hala-skrzyczenska-2': 'https://player.webcamera.pl/tmr_cam_c488d9',
  'https://imageserver.webcamera.pl/umiesc/szczyrk-solisko': 'https://player.webcamera.pl/tmr_cam_21195a',
  'https://imageserver.webcamera.pl/umiesc/bialy-krzyz': 'https://player.webcamera.pl/bialykrzyz_cam_b23041',
  'https://imageserver.webcamera.pl/umiesc/zwardon-ski': 'https://player.webcamera.pl/zwardon_cam_9eb18f',
  'https://imageserver.webcamera.pl/umiesc/czarnygron-stok2': 'https://player.webcamera.pl/czarnygron_cam_c0df65'
};
let favorites = loadFavs();
let favsMigrated = false;
items.forEach(el => {
  el.dataset.id = getItemId(el);
  const oldSrc = LEGACY_SRC[el.querySelector('iframe')?.dataset?.src];
  const oldId = oldSrc && getItemId(el, oldSrc);
  if (oldId && favorites.has(oldId)) {
    favorites.delete(oldId);
    favorites.add(el.dataset.id);
    favsMigrated = true;
  }
});
if (favsMigrated) saveFavs(favorites);

const syncFavButtons = () => {
  items.forEach(el => {
    const id = el.dataset.id;
    const btn = el.querySelector('.fav-btn');
    if (!btn || !id) return;
    const isFav = favorites.has(id);
    btn.setAttribute('aria-pressed', isFav ? 'true' : 'false');
    btn.setAttribute('aria-label', `${isFav ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}: ${el.dataset.name || ''}`);
  });
};

const getCameraUrl = card => card.querySelector('iframe').dataset.src;

function updateModalContent(index) {
  const card = items[index];
  if (!card) return;
  const { name, cat } = card.dataset;
  camModalIframe = swapFrameSrc(camModalIframe, getCameraUrl(card));
  camModalIframe.title = `Kamera: ${name}`;
  camModalLabel.textContent = `${name} · ${TAGS[cat]}`;
  currentModalIndex = index;
}

// Każda kamera ma własny adres (#kamera-szyndzielnia-polana). Otwarcie podglądu dodaje wpis
// do historii, więc Wstecz w przeglądarce lub na Androidzie zamyka podgląd zamiast opuszczać stronę.
const camSlug = card => 'kamera-' + (card?.dataset?.name || '')
  .toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const camHash = card => '#' + camSlug(card);

{
  const pageUrl = document.querySelector('link[rel="canonical"]').href;
  const ld = document.createElement('script');
  ld.type = 'application/ld+json';
  ld.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': pageUrl + '#kamery',
    name: 'Kamery na żywo – Beskid Śląski i Żywiecki',
    numberOfItems: items.length,
    itemListElement: items.map((card, i) => ({ '@type': 'ListItem', position: i + 1, name: card.dataset.name, url: pageUrl + camHash(card) }))
  });
  document.head.append(ld);
}
const indexFromHash = () => {
  const hash = decodeURIComponent(location.hash || '');
  if (!hash.startsWith('#kamera-')) return -1;
  return items.findIndex(card => camHash(card) === hash);
};
const isModalOpen = () => camModal.open;
let modalBaseKey = null; // wpis historii sprzed otwarcia podglądu (Navigation API)
const pushCamState = card => {
  modalBaseKey = window.navigation?.currentEntry?.key || null;
  history.pushState({ cam: true }, '', camHash(card));
};

function openModal(index, { fromHistory = false } = {}) {
  if (!items[index]) return;
  if (!fromHistory && !isModalOpen()) pushCamState(items[index]);
  updateModalContent(index);
  camModal.showModal();
  syncTileFrames();
}

function closeModal() {
  if (!isModalOpen()) return;
  // Wpis dodany przez podgląd – cofamy się, a popstate zamknie podgląd
  if (history.state?.cam) {
    // traverseTo przeskakuje też wpisy, które mogły dopisać ramki z kamerami
    if (modalBaseKey && window.navigation?.traverseTo) {
      const nav = navigation.traverseTo(modalBaseKey);
      nav.committed.catch(() => {});
      nav.finished.catch(() => {
        history.replaceState(null, '', location.pathname + location.search);
        hideModal();
      });
    } else {
      history.back();
    }
    return;
  }
  history.replaceState(null, '', location.pathname + location.search);
  hideModal();
}

function hideModal() {
  if (!isModalOpen()) return;
  camModal.close();
  camModalIframe = swapFrameSrc(camModalIframe, '');
  syncTileFrames();
  // Fokus wraca na przycisk kafla, na którym skończyło się przeglądanie
  const opener = items[currentModalIndex]?.querySelector('.frame-click-mask');
  if (opener && opener.offsetParent !== null) opener.focus({ preventScroll: true });
  currentModalIndex = -1;
}

// Strzałki przechodzą tylko po kamerach widocznych po filtrze/wyszukiwaniu
// (gdy żadna nie jest widoczna, np. po wejściu z linku – po wszystkich)
function stepModal(dir) {
  const isVisible = card => card.style.display !== 'none';
  const anyVisible = items.some(isVisible);
  for (let i = 1; i < items.length; i++) {
    const nextIndex = (currentModalIndex + dir * i + items.length * items.length) % items.length;
    const card = items[nextIndex];
    if (anyVisible && !isVisible(card)) continue;
    updateModalContent(nextIndex);
    history.replaceState(history.state, '', camHash(card));
    return;
  }
}

document.addEventListener('click', (e) => {
  if (e.target.closest?.('.fav-btn')) {
    const btn = e.target.closest('.fav-btn');
    const card = btn.closest('.cam-item');
    const id = card?.dataset?.id;
    if (id) {
      if (favorites.has(id)) favorites.delete(id);
      else favorites.add(id);
      saveFavs(favorites);
      syncFavButtons();
      applyFilters();
    }
    return;
  }
  if (e.target.closest?.('.cam-item')) {
    openModal(items.indexOf(e.target.closest('.cam-item')));
    return;
  }
  // Klik w tło (sam <dialog>) albo w przycisk zamknięcia
  if (e.target === camModal || e.target.closest?.('.cam-modal-close')) closeModal();
  else if (e.target.closest?.('.cam-modal-prev')) stepModal(-1);
  else if (e.target.closest?.('.cam-modal-next')) stepModal(1);
});

// Escape: zamykamy przez closeModal, żeby cofnąć też wpis historii
camModal.addEventListener('cancel', (e) => {
  e.preventDefault();
  closeModal();
});

document.addEventListener('keydown', (e) => {
  if (!isModalOpen()) return;
  if (e.key === 'ArrowLeft') stepModal(-1);
  else if (e.key === 'ArrowRight') stepModal(1);
});

// Klik w obraz przenosi fokus do ramki i strzałki przestają działać – oddaj fokus przyciskowi zamknięcia
camModal.addEventListener('focusout', () => {
  setTimeout(() => {
    if (isModalOpen() && document.activeElement === camModalIframe) camModalClose.focus();
  }, 0);
});

// Kafle odtwarzają obraz tylko wtedy, gdy są w pobliżu ekranu i nie zasłania ich podgląd.
// Adres kamery zostaje w data-src, a ramka poza ekranem traci src,
// żeby nie pobierać strumieni, których nikt nie ogląda.
const frameWraps = lazyFrames.map(frame => frame.parentElement);
const nearViewport = new Set();
function syncTileFrames() {
  const modalOpen = isModalOpen();
  frameWraps.forEach(wrap => {
    const frame = wrap.querySelector('iframe.lazy-iframe');
    if (!frame) return;
    const show = !modalOpen && nearViewport.has(wrap);
    swapFrameSrc(frame, show ? frame.dataset.src : '');
  });
}

if ('IntersectionObserver' in window) {
  const lazyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) nearViewport.add(entry.target);
      else nearViewport.delete(entry.target);
    });
    syncTileFrames();
  }, { rootMargin: '200px 0px' });

  frameWraps.forEach(wrap => lazyObserver.observe(wrap));
} else {
  frameWraps.forEach(wrap => nearViewport.add(wrap));
  syncTileFrames();
}

const scaledFrames = [...document.querySelectorAll('iframe.frame-scaled')];
if (scaledFrames.length && 'ResizeObserver' in window) {
  const scaleObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
      const frame = entry.target.querySelector('iframe.frame-scaled');
      if (frame) frame.style.setProperty('--frame-scale', String(entry.contentRect.width / 1280));
    });
  });
  scaledFrames.forEach(frame => scaleObserver.observe(frame.parentElement));
}

// Wyszukiwanie bez względu na polskie znaki: „Lysa” znajdzie „Łysa”, „szczyrk” – „Szczyrk”
const normalize = str => (str || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l');
const EMPTY_FAV_TEXT = 'Brak ulubionych. Kliknij gwiazdkę na kamerze, aby dodać ją do ulubionych.';

// Nazwy miejsc do wyszukiwania (z etykiet filtrów + dodatkowe miejscowości)
const REGION_EXTRA = { bielsko: 'bielsko wilkowice', wisla: 'wisla ustron istebna', zywiecki: 'beskid zywiecki korbielow zawoja zwardon', maly: 'beskid maly miedzybrodzie rzyki' };
const regionNames = {};
regionChips.forEach(ch => {
  const key = ch.dataset.region;
  if (key !== 'all') regionNames[key] = normalize(ch.textContent + ' ' + (REGION_EXTRA[key] || ''));
});

function applyFilters() {
  const rawTerm = (q.value || '').trim();
  const term = normalize(rawTerm);
  let visibleCount = 0;
  items.forEach(el => {
    const name = normalize(el.dataset.name);
    const cat = (el.dataset.cat || '').toLowerCase();
    const region = el.dataset.region || '';
    // Szukanie obejmuje też nazwę miejsca: „szczyrk” znajdzie Solisko, „ustroń” – Czantorię
    const okTerm = !term || name.includes(term) || (regionNames[region] || '').includes(term);
    const isFav = favorites.has(el.dataset.id);
    const okCat = (activeFilter === 'all') || (cat === activeFilter) || (activeFilter === 'fav' && isFav);
    // Kafle bez miejsca (pogoda) dotyczą całych Beskidów, więc filtr miejsca ich nie ukrywa
    const okRegion = activeRegion === 'all' || !region || region === activeRegion;
    const isVisible = (okTerm && okCat && okRegion);
    el.style.display = isVisible ? '' : 'none';
    if (isVisible) visibleCount++;
  });
  if (emptyState) {
    const showEmpty = visibleCount === 0;
    const narrowed = activeFilter !== 'all' || activeRegion !== 'all';
    if (term) {
      emptyState.textContent = `Brak wyników dla „${rawTerm}”${narrowed ? ' przy wybranych filtrach' : ''}. Spróbuj innej nazwy${narrowed ? ' lub wybierz „Wszystkie” i „Całe Beskidy”' : ''}.`;
    } else if (activeFilter === 'fav' && activeRegion === 'all') {
      emptyState.textContent = EMPTY_FAV_TEXT;
    } else if (activeFilter === 'fav') {
      emptyState.textContent = 'Brak ulubionych kamer w tym miejscu. Wybierz „Całe Beskidy” lub dodaj kamerę gwiazdką.';
    } else {
      emptyState.textContent = 'Brak kamer z tej kategorii w wybranym miejscu. Wybierz inne miejsce lub „Wszystkie”.';
    }
    emptyState.style.display = showEmpty ? 'block' : 'none';
  }
  // Ukryj nagłówek i siatkę sekcji, w której nie został żaden widoczny kafel
  document.querySelectorAll('.grid').forEach(grid => {
    const hasVisible = [...grid.querySelectorAll('.cam-item')].some(el => el.style.display !== 'none');
    grid.style.display = hasVisible ? '' : 'none';
    const title = grid.previousElementSibling;
    if (title?.classList.contains('section-title')) title.style.display = hasVisible ? '' : 'none';
  });
}
q.addEventListener('input', applyFilters);

window.addEventListener('popstate', () => {
  const idx = indexFromHash();
  if (idx === -1) hideModal();
  else if (!isModalOpen()) openModal(idx, { fromHistory: true });
  else if (idx !== currentModalIndex) updateModalContent(idx);
});

// Ostatnio wybrana kategoria i miejsce wracają przy następnym wejściu
const FILTERS_KEY = 'abc:filters:v1';
const setActiveChip = (group, ch) => group.forEach(x => {
  x.classList.toggle('active', x === ch);
  x.setAttribute('aria-pressed', x === ch ? 'true' : 'false');
});
const saveFilters = () => {
  try { localStorage.setItem(FILTERS_KEY, JSON.stringify({ filter: activeFilter, region: activeRegion })); } catch (_) {}
};
chips.forEach(ch => {
  ch.addEventListener('click', () => {
    setActiveChip(chips, ch);
    activeFilter = ch.dataset.filter;
    saveFilters();
    applyFilters();
  });
});
regionChips.forEach(ch => {
  ch.addEventListener('click', () => {
    setActiveChip(regionChips, ch);
    activeRegion = ch.dataset.region;
    // Na telefonie wiersz przewija się w bok – dosuń wybrane miejsce, żeby było widać je w całości
    ch.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    saveFilters();
    applyFilters();
  });
});
try {
  const saved = JSON.parse(localStorage.getItem(FILTERS_KEY) || '{}');
  // „Ulubione” bez żadnej ulubionej kamery pokazałyby pustą stronę – wtedy zostaje „Wszystkie”
  const chip = saved.filter === 'fav' && !favorites.size ? null : chips.find(ch => ch.dataset.filter === saved.filter);
  const regionChip = regionChips.find(ch => ch.dataset.region === saved.region);
  if (chip) { setActiveChip(chips, chip); activeFilter = saved.filter; }
  if (regionChip) { setActiveChip(regionChips, regionChip); activeRegion = saved.region; }
} catch (_) {}
q.addEventListener('focus', () => {
  document.querySelector('.searchbar').scrollIntoView({ behavior: 'smooth', block: 'start' });
});
syncFavButtons();
applyFilters();

// Panel prognozy (Open-Meteo, bez klucza). Wynik trzymamy w localStorage na godzinę,
// a gdy sieci brak – pokazujemy ostatnie dane, o ile dotyczą dzisiejszego lub późniejszych dni.
(() => {
  const wx = document.getElementById('wx');
  if (!wx || !window.fetch) return;
  const WX_KEY = 'abc:wx:v1';
  const WX_TTL = 60 * 60 * 1000;
  const WX_URL = 'https://api.open-meteo.com/v1/forecast?latitude=49.82&longitude=19.04'
    + '&daily=sunrise,sunset,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max'
    + '&timezone=Europe%2FWarsaw&forecast_days=4';
  const pad = n => String(n).padStart(2, '0');
  const todayStr = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
  const readCache = () => { try { return JSON.parse(localStorage.getItem(WX_KEY) || 'null'); } catch (_) { return null; } };
  const writeCache = data => { try { localStorage.setItem(WX_KEY, JSON.stringify({ t: Date.now(), data })); } catch (_) {} };
  const num = v => (typeof v === 'number' && isFinite(v) ? v : null);
  const fmtTemp = v => (num(v) == null ? '–' : `${Math.round(v)}°`);
  const fmtMm = v => (num(v) == null ? '–' : `${(Math.round(v * 10) / 10).toLocaleString('pl-PL')} mm`);
  const fmtTime = iso => (typeof iso === 'string' && iso.length >= 16 ? iso.slice(11, 16) : '–');
  const dayLabel = (iso, n) => {
    if (n === 0) return 'Dziś';
    if (n === 1) return 'Jutro';
    const wd = new Date(iso + 'T12:00:00').toLocaleDateString('pl-PL', { weekday: 'short' }).replace('.', '');
    return wd.charAt(0).toUpperCase() + wd.slice(1);
  };

  function render(data) {
    const d = data && data.daily;
    if (!d || !Array.isArray(d.time) || !d.time.length) return false;
    const start = d.time.findIndex(t => t >= todayStr());
    if (start === -1) return false;
    const idx = [start, start + 1, start + 2].filter(i => i < d.time.length);
    const col = (arr, i) => (Array.isArray(arr) ? arr[i] : null);
    const head = '<tr><td class="wx-col-label"></td>'
      + idx.map((i, n) => `<th scope="col">${dayLabel(d.time[i], n)}</th>`).join('') + '</tr>';
    const row = (label, cell) => `<tr><th scope="row">${label}</th>${idx.map(i => `<td>${cell(i)}</td>`).join('')}</tr>`;
    wx.querySelector('thead').innerHTML = head;
    wx.querySelector('tbody').innerHTML = [
      row('Temp.', i => `<span class="wx-max">${fmtTemp(col(d.temperature_2m_max, i))}</span> <span class="wx-min">/ ${fmtTemp(col(d.temperature_2m_min, i))}</span>`),
      row('Opady', i => {
        const p = num(col(d.precipitation_probability_max, i));
        return fmtMm(col(d.precipitation_sum, i)) + (p != null ? ` <span class="wx-prob">${Math.round(p)}%</span>` : '');
      }),
      row('Wschód', i => fmtTime(col(d.sunrise, i))),
      row('Zachód', i => fmtTime(col(d.sunset, i)))
    ].join('');
    wx.hidden = false;
    return true;
  }

  let loading = false;
  async function loadWeather() {
    if (loading) return;
    const cached = readCache();
    const shown = !!(cached && render(cached.data));
    if (shown && Date.now() - cached.t < WX_TTL) return;
    loading = true;
    try {
      const res = await fetch(WX_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      if (render(data)) writeCache(data);
    } catch (_) {
      if (!shown) wx.hidden = true;
    } finally {
      loading = false;
    }
  }

  loadWeather();
  // PWA otwarta długo w tle: po powrocie odśwież, jeśli dane są starsze niż godzina
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') loadWeather();
  });
})();

// Share functionality
const shareData = {
  title: 'Awesome Beskid Camera',
  text: 'Kamery na żywo z Beskidu Śląskiego i Żywieckiego. Bike i Snow w jednym miejscu.',
  url: location.origin + location.pathname
};

const toast = document.getElementById('toast');
const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
};

const shareApp = async () => {
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      showToast('Udostępniono!');
      return;
    } catch (err) {
      // Anulowanie przez użytkownika to nie błąd; przy innym błędzie kopiujemy link
      if (err.name === 'AbortError') return;
    }
  }
  try {
    await navigator.clipboard.writeText(location.href);
    showToast('Link skopiowany do schowka!');
  } catch (_) {
    showToast('Nie udało się skopiować linku');
  }
};

document.querySelector('.share-btn').addEventListener('click', shareApp);

// Wejście z linku do kamery: pod nim zostaje strona główna, więc Wstecz zamknie podgląd
{
  const idx = indexFromHash();
  if (idx !== -1) {
    const hash = location.hash;
    history.replaceState(null, '', location.pathname + location.search);
    modalBaseKey = window.navigation?.currentEntry?.key || null;
    history.pushState({ cam: true }, '', hash);
    openModal(idx, { fromHistory: true });
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const register = () => navigator.serviceWorker.register('./service-worker.js');
    if ('requestIdleCallback' in window) requestIdleCallback(register, { timeout: 2000 });
    else setTimeout(register, 0);
  });
}
