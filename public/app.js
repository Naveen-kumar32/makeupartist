// Sivasankari Makeup Artist — front-end
(() => {
  const WHATSAPP = '917305146407';
  const PAGE_SIZE = 12;

  // ---------- translations ----------
  // English text lives in index.html; only Tamil is listed here.
  const TA = {
    brandSub: 'மேக்கப் ஆர்டிஸ்ட்',
    navHome: 'முகப்பு', navServices: 'சேவைகள்', navGallery: 'கேலரி', navAbout: 'என்னைப் பற்றி', navFaq: 'கேள்விகள்', navContact: 'தொடர்பு',
    ctaBook: 'தேதி புக் செய்ய', ctaWhatsapp: 'வாட்ஸ்அப் செய்ய',
    heroEyebrow: 'மணப்பெண் மேக்கப் · சென்னை மற்றும் சுற்றுவட்டாரம்',
    heroTitle: 'நாள் முழுவதும் நிலைக்கும் உங்கள் திருமண அழகு',
    heroLead: 'வியர்வையிலும் கலையாத, நீண்ட நேரம் நிலைக்கும், இயற்கையான சருமத் தோற்றம் தரும் மேக்கப். ஹேர்ஸ்டைல், புடவை டிரேப்பிங் உடன். உங்கள் வீட்டிற்கோ மண்டபத்திற்கோ நானே வருகிறேன்.',
    statBrides: 'மணப்பெண்கள்', statYears: 'ஆண்டுகள் அனுபவம்', statHours: 'மணி நேர மணப்பெண் சேவை',
    heroArch: 'HD · ஏர்பிரஷ் · மேட் · டியூயி',
    areasLabel: 'சேவை பகுதிகள்', areaThirukovilur: 'திருக்கோவிலூர்', areaVillupuram: 'விழுப்புரம்', areaTvm: 'திருவண்ணாமலை',
    servicesEyebrow: 'சேவைகள்',
    servicesTitle: 'கொண்டாட்டத்தின் ஒவ்வொரு தருணத்திற்கும் மேக்கப்',
    servicesLead: 'உங்கள் சருமம், உடை, நிகழ்ச்சி நேரம் ஆகியவற்றுக்கு ஏற்ப ஒவ்வொரு தோற்றமும் அமைக்கப்படுகிறது. விலை விவரம் விசாரணையில்.',
    tagSignature: 'சிறப்பு',
    svcBridal: 'மணப்பெண் மேக்கப்', svcBridalDesc: 'ஹேர்ஸ்டைல், புடவை டிரேப்பிங், லென்ஸ் உடன் முழுமையான முகூர்த்த தோற்றம். விழா முழுவதும் புதுப்பொலிவுடன் இருக்கும்.',
    svcReception: 'ரிசப்ஷன் மேக்கப்', svcReceptionDesc: 'மேடை விளக்குகளிலும் புகைப்படங்களிலும் அழகாகத் தெரியும் மாலை நேரத் தோற்றம்.',
    svcEngagement: 'நிச்சயதார்த்த மேக்கப்', svcEngagementDesc: 'உங்கள் நிச்சயதார்த்தத்திற்கு மென்மையான, புதுமையான, நேர்த்தியான தோற்றம்.',
    svcBaby: 'வளைகாப்பு / சீமந்தம்', svcBabyDesc: 'வளைகாப்பு, சீமந்தத்திற்கு மென்மையான, வசதியான மேக்கப்.',
    svcParty: 'பார்ட்டி & விருந்தினர் தோற்றம்', svcPartyDesc: 'குடும்பத்தினர், விருந்தினர் மற்றும் எல்லா சிறப்பு நிகழ்ச்சிகளுக்கும்.',
    svcBridesmaid: 'மணப்பெண் தோழி மேக்கப்', svcBridesmaidDesc: 'சகோதரிகள், உறவினர்கள், தோழிகளுக்கு ஒருங்கிணைந்த தோற்றம்.',
    svcGroom: 'மணமகன் மேக்ஓவர்', svcGroomDesc: 'புகைப்படங்களில் சீரான சரும நிறத்துடன் இயற்கையான அலங்காரம்.',
    svcSaree: 'புடவை டிரேப்பிங் & ப்ரீ-ப்ளீட்டிங்', svcSareeDesc: 'நிகழ்ச்சிக்கு முன்பே தயாராக, கலையாமல் நிற்கும் நேர்த்தியான மடிப்புகள்.',
    svcHair: 'ஹேர்ஸ்டைல்', svcHairDesc: 'உங்கள் தோற்றத்திற்கு ஏற்ற மணப்பெண் கொண்டை, பின்னல், பூ அலங்காரம்.',
    finishTitle: 'உங்கள் ஃபினிஷைத் தேர்ந்தெடுங்கள்',
    finishHD: 'HD மேக்கப்', finishAirbrush: 'ஏர்பிரஷ் மேக்கப்', finishMatte: 'மேட் ஃபினிஷ்', finishDewy: 'டியூயி ஃபினிஷ்', finishNormal: 'சாதாரண மேக்கப்',
    offerTitle: 'பண்டிகை சலுகைகள்', offerText: 'மணப்பெண் மற்றும் குடும்ப புக்கிங்கிற்கான சீசன் சலுகைகள் பற்றிக் கேளுங்கள்.', offerCta: 'இப்போதே கேளுங்கள்',
    galleryEyebrow: 'கேலரி', galleryTitle: 'உண்மையான கொண்டாட்டங்களின் தோற்றங்கள்',
    galleryLead: 'அவர்களின் முக்கியமான நாளுக்கு நான் அலங்கரித்த மணப்பெண்களும் குடும்பத்தினரும்.',
    catAll: 'அனைத்தும்', catBridal: 'மணப்பெண்', catReception: 'ரிசப்ஷன்', catEngagement: 'நிச்சயதார்த்தம்', catParty: 'பார்ட்டி', catSaree: 'புடவை டிரேப்பிங்', catHair: 'ஹேர்ஸ்டைல்',
    emptyTitle: 'புதிய புகைப்படங்கள் விரைவில்',
    emptyText: 'சமீபத்திய தோற்றங்களுடன் கேலரி புதுப்பிக்கப்படுகிறது.',
    emptyInsta: 'அதுவரை, என் வேலைகளை இன்ஸ்டாகிராமில் பாருங்கள் →',
    loadMore: 'மேலும் காட்டு',
    aboutEyebrow: 'என்னைப் பற்றி', aboutTitle: 'வணக்கம், நான் சிவசங்கரி',
    aboutP1: 'நான் வெற்றி அகாடமியில் பயிற்சி பெற்ற சான்றிதழ் பெற்ற மேக்கப் ஆர்டிஸ்ட். கடந்த இரண்டரை ஆண்டுகளில் சென்னை மற்றும் சுற்றியுள்ள ஊர்களில் 50-க்கும் மேற்பட்ட மணப்பெண்களுக்கு மேக்கப் செய்துள்ளேன்.',
    aboutP2: 'நிலைத்து நிற்கும் மேக்கப்பே என் நோக்கம்: வியர்வையில் கலையாத, நீண்ட நேரம் நிலைக்கும், உங்கள் சொந்த சருமம் போலவே தோன்றும் ஃபினிஷ். அதிகாலை முகூர்த்தம் முதல் மாலை ரிசப்ஷன் வரை, முதல் புகைப்படத்தைப் போலவே கடைசி புகைப்படத்திலும் புதுப்பொலிவுடன் இருப்பீர்கள்.',
    why1: 'வியர்வையில் கலையாத, நீண்ட நேரம் நிலைக்கும் மேக்கப்', why2: 'உங்கள் சருமத்திற்கு ஏற்ற இயற்கையான ஃபினிஷ்',
    why3: 'மேக்கப், ஹேர்ஸ்டைல், புடவை டிரேப்பிங் அனைத்தும் ஒரே ஆர்டிஸ்டிடம்', why4: 'உங்கள் வீட்டிற்கோ மண்டபத்திற்கோ நானே வருகிறேன்',
    brandsLabel: 'நான் பயன்படுத்தும் பிராண்டுகள்',
    stepsEyebrow: 'புக்கிங் செய்வது எப்படி', stepsTitle: 'நான்கு எளிய படிகள்',
    step1T: 'தேதியை அனுப்புங்கள்', step1D: 'படிவத்தை நிரப்புங்கள் அல்லது நிகழ்ச்சி தேதி, இடத்துடன் அழையுங்கள் / வாட்ஸ்அப் செய்யுங்கள்.',
    step2T: 'தோற்றத்தைத் திட்டமிடுங்கள்', step2D: 'உங்கள் உடை, ஃபினிஷ், பேக்கேஜ் பற்றிப் பேசுவோம். ட்ரையல் மேக்கப் ₹1,000.',
    step3T: 'அட்வான்ஸ் செலுத்தி உறுதிசெய்யுங்கள்', step3D: 'அட்வான்ஸ் செலுத்தியதும் உங்கள் தேதி உறுதியாகும். UPI, வங்கி பரிமாற்றம், ரொக்கம் ஏற்கப்படும்.',
    step4T: 'அன்று ஜொலியுங்கள்', step4D: 'தேவையான அனைத்தையும் எடுத்துக்கொண்டு குறித்த நேரத்தில் உங்கள் இடத்திற்கு வருவேன்.',
    bookEyebrow: 'தேதி புக் செய்ய', bookTitle: 'உங்கள் தேதி கிடைக்குமா என்று பாருங்கள்',
    bookLead: 'ஜனவரி, பிப்ரவரி, மே, ஜூன், அக்டோபர், நவம்பர், டிசம்பர் மாதங்கள் விரைவில் நிரம்பிவிடும். சுமார் 2 மாதங்களுக்கு முன்பே புக் செய்யுங்கள்.',
    fName: 'உங்கள் பெயர்', fPhone: 'மொபைல் எண்', fDate: 'நிகழ்ச்சி தேதி', fType: 'நிகழ்ச்சி வகை', fVenue: 'இடம் / பகுதி',
    fMsg: 'வேறு ஏதாவது?', optional: '(விருப்பம்)', optOther: 'மற்றவை',
    fSubmit: 'வாட்ஸ்அப்பில் அனுப்பு',
    fNote: 'உங்கள் விவரங்களுடன் வாட்ஸ்அப் திறக்கும். பொதுவாக அதே நாளில் பதில் அளிப்பேன்.',
    faqEyebrow: 'கேள்விகள்', faqTitle: 'மணப்பெண்கள் அடிக்கடி கேட்கும் கேள்விகள்',
    q1: 'ட்ரையல் மேக்கப் உண்டா?', a1: 'ஆம். ட்ரையல் மேக்கப் கட்டணம் ₹1,000.',
    q2: 'எவ்வளவு முன்பே புக் செய்ய வேண்டும்?', a2: 'திருமணத்திற்கு சுமார் 2 மாதங்களுக்கு முன். ஜனவரி, பிப்ரவரி, மே, ஜூன், அக்டோபர், நவம்பர், டிசம்பர் முகூர்த்த தேதிகளுக்கு இன்னும் முன்பே புக் செய்யுங்கள்.',
    q3: 'மணப்பெண் மேக்கப்பிற்கு எவ்வளவு நேரம் ஆகும்?', a3: 'ஹேர்ஸ்டைல், புடவை டிரேப்பிங், டச்-அப் உட்பட அன்று சுமார் 5 முதல் 8 மணி நேரம் உங்களுடன் இருப்பேன்.',
    q4: 'மணப்பெண் பேக்கேஜில் என்ன அடங்கும்?', a4: 'மேக்கப், ஹேர்ஸ்டைல், புடவை டிரேப்பிங், லென்ஸ். ஒவ்வொரு பேக்கேஜின் முழு விவரத்தையும் என்னிடம் கேளுங்கள்.',
    q5: 'பூ, அக்சசரீஸ், நகைகள் சேர்க்கப்படுமா?', a5: 'அக்சசரீஸ், பூ, நகைகளை நீங்களே கொண்டு வர வேண்டும். கூடுதலாக ஏதேனும் ஏற்பாடு செய்ய வேண்டுமெனில் கூடுதல் கட்டணம் உண்டு.',
    q6: 'மண்டபத்திற்கு வருவீர்களா?', a6: 'ஆம். சென்னை, திருக்கோவிலூர், விழுப்புரம், திருவண்ணாமலை மற்றும் அருகிலுள்ள பகுதிகளில் உங்கள் வீட்டிற்கோ மண்டபத்திற்கோ வருவேன். பயணக் கட்டணம் இடத்தைப் பொறுத்தது.',
    q7: 'அட்வான்ஸ் எவ்வளவு? திரும்பப் பெற முடியுமா?', a7: 'அட்வான்ஸ் செலுத்தியதும் உங்கள் தேதி உறுதியாகும். தொகை விசாரணையில் தெரிவிக்கப்படும். புக்கிங் ஒப்பந்தப்படி அட்வான்ஸ் திரும்பத் தரப்படாது.',
    q8: 'எப்படி பணம் செலுத்தலாம்?', a8: 'UPI, வங்கி பரிமாற்றம், ரொக்கம் அனைத்தும் ஏற்கப்படும்.',
    footerTag: 'உங்கள் இடத்திலேயே மணப்பெண் மேக்கப், ஹேர்ஸ்டைல், புடவை டிரேப்பிங்.',
    footContact: 'தொடர்பு', footAddress: 'முகவரி', footHours: 'நேரம்',
    address: 'எண் 3, ராஜேஷ் நகர் 4வது மெயின் ரோடு, நாராயணபுரம், பள்ளிக்கரணை, சென்னை 600100',
    addressNote: 'மேக்கப் உங்கள் வீட்டில் அல்லது மண்டபத்தில், முன்பதிவின் பேரில்.',
    hours: 'திங்கள் முதல் ஞாயிறு, காலை 9 முதல் மாலை 6 வரை', hoursNote: 'அதிகாலை முகூர்த்த புக்கிங் உண்டு.',
    backTop: 'மேலே செல்ல ↑',
    devBy: 'உருவாக்கியது',
    seeServices: 'அனைத்து சேவைகளும் →', seeGallery: 'முழு கேலரியைப் பார்க்க', moreAbout: 'என்னைப் பற்றி மேலும் →',
    homeGalleryTitle: 'சமீபத்திய தோற்றங்கள்',
    ctaTitle: 'திருமணத்தைத் திட்டமிடுகிறீர்களா?', ctaText: 'முகூர்த்த தேதிகள் விரைவில் நிரம்பிவிடும். சுமார் 2 மாதங்களுக்கு முன்பே புக் செய்யுங்கள்.', ctaCall: 'அழைக்க',
    statCert: 'வெற்றி அகாடமி சான்றிதழ்', statCertN: 'சான்றிதழ்',
    faqMore: 'இன்னும் கேள்வி உள்ளதா?', faqMoreText: 'வாட்ஸ்அப்பில் செய்தி அனுப்புங்கள், அதே நாளில் பதில் அளிப்பேன்.',
    contactEyebrow: 'தொடர்பு', contactCall: 'அழைக்க', contactWa: 'வாட்ஸ்அப்', contactEmail: 'மின்னஞ்சல்', contactInsta: 'இன்ஸ்டாகிராம்',
    mapTitle: 'என் இருப்பிடம்',
    nfTitle: 'பக்கம் கிடைக்கவில்லை', nfText: 'நீங்கள் தேடும் பக்கம் இல்லை அல்லது மாற்றப்பட்டுள்ளது.', nfHome: 'முகப்புக்குச் செல்ல',
  };

  // Messages built in JS
  const MSG = {
    en: {
      langBtn: 'தமிழ்',
      needFields: 'Please fill in your name, mobile number and event date.',
      bookOk: 'Opening WhatsApp… If it does not open, call +91 73051 46407.',
      cats: { bridal: 'Bridal', reception: 'Reception', engagement: 'Engagement', party: 'Party', saree: 'Saree draping', hair: 'Hairstyle', other: 'Other' },
      wa: (d) => `Hello Sivasankari! I'd like to book makeup.\n\nName: ${d.name}\nMobile: ${d.phone}\nEvent date: ${d.eventDate}\nEvent: ${d.eventType}\nVenue: ${d.venue || '-'}${d.message ? `\nNote: ${d.message}` : ''}`,
    },
    ta: {
      langBtn: 'English',
      needFields: 'உங்கள் பெயர், மொபைல் எண், நிகழ்ச்சி தேதியை நிரப்புங்கள்.',
      bookOk: 'வாட்ஸ்அப் திறக்கிறது… திறக்கவில்லை என்றால் +91 73051 46407 அழையுங்கள்.',
      cats: { bridal: 'மணப்பெண்', reception: 'ரிசப்ஷன்', engagement: 'நிச்சயதார்த்தம்', party: 'பார்ட்டி', saree: 'புடவை டிரேப்பிங்', hair: 'ஹேர்ஸ்டைல்', other: 'மற்றவை' },
      wa: (d) => `வணக்கம் சிவசங்கரி! மேக்கப் புக் செய்ய விரும்புகிறேன்.\n\nபெயர்: ${d.name}\nமொபைல்: ${d.phone}\nநிகழ்ச்சி தேதி: ${d.eventDate}\nநிகழ்ச்சி: ${d.eventType}\nஇடம்: ${d.venue || '-'}${d.message ? `\nகுறிப்பு: ${d.message}` : ''}`,
    },
  };

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // ---------- language ----------
  const i18nEls = $$('[data-i18n]');
  i18nEls.forEach((el) => (el.dataset.en = el.innerHTML));

  let lang = 'en';
  try { lang = localStorage.getItem('lang') === 'ta' ? 'ta' : 'en'; } catch {}

  const t = (key) => MSG[lang][key];

  function applyLang() {
    document.documentElement.lang = lang;
    i18nEls.forEach((el) => {
      const key = el.dataset.i18n;
      el.innerHTML = lang === 'ta' && TA[key] ? TA[key] : el.dataset.en;
    });
    $('#langToggle').textContent = t('langBtn');
    renderGallery();
  }

  $('#langToggle').addEventListener('click', () => {
    lang = lang === 'en' ? 'ta' : 'en';
    try { localStorage.setItem('lang', lang); } catch {}
    applyLang();
  });

  // ---------- header / menu ----------
  const header = $('.site-header');
  const nav = $('#nav');
  const menuBtn = $('#menuBtn');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  $('#year').textContent = new Date().getFullYear();

  // ---------- reveal on scroll ----------
  const revealTargets = $$('.section-head, .card, .finishes, .offer, .about-photo, .about-copy, .steps li, .form, .faq details, .contact-card, .cta-inner, .stats li');
  revealTargets.forEach((el) => el.classList.add('reveal'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('in'));
  }

  // ---------- booking form (contact page) ----------
  const bookingForm = $('#bookingForm');
  if (bookingForm) {
    const bookingStatus = $('#bookingStatus');
    $('#bDate').min = new Date().toISOString().slice(0, 10);

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(bookingForm));
      Object.keys(d).forEach((k) => (d[k] = d[k].trim()));

      const missing = ['name', 'phone', 'eventDate'].filter((k) => !d[k]);
      $$('input', bookingForm).forEach((i) => i.removeAttribute('aria-invalid'));
      if (missing.length) {
        missing.forEach((k) => bookingForm.elements[k].setAttribute('aria-invalid', 'true'));
        bookingStatus.className = 'form-status err';
        bookingStatus.textContent = t('needFields');
        bookingForm.elements[missing[0]].focus();
        return;
      }

      d.eventType = bookingForm.elements.eventType.selectedOptions[0].textContent;
      const pretty = new Date(d.eventDate + 'T00:00').toLocaleDateString(lang === 'ta' ? 'ta-IN' : 'en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

      // Keep a copy on the server so no enquiry is lost; WhatsApp opens regardless.
      fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(d),
        keepalive: true,
      }).catch(() => {});

      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t('wa')({ ...d, eventDate: pretty }))}`, '_blank', 'noopener');
      bookingStatus.className = 'form-status ok';
      bookingStatus.textContent = t('bookOk');
    });
  }

  // ---------- gallery (gallery page + home preview) ----------
  // A grid with data-limit is a preview: fixed count, no filters or "show more".
  const grid = $('#galleryGrid');
  const empty = $('#galleryEmpty');
  const loadMoreBtn = $('#loadMore');
  const limit = grid ? +grid.dataset.limit || 0 : 0;
  let photos = [];
  let filter = 'all';
  let shown = limit || PAGE_SIZE;

  const visible = () => (filter === 'all' ? photos : photos.filter((p) => p.category === filter));

  const captionText = (p) => [p.caption, t('cats')[p.category]].filter(Boolean).join(' · ');

  function renderGallery() {
    if (!grid) return;
    const list = visible();
    grid.innerHTML = '';
    if (empty) empty.hidden = list.length > 0;
    list.slice(0, shown).forEach((p, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'g-item';
      btn.dataset.index = i;
      const img = document.createElement('img');
      img.src = p.url;
      img.alt = p.caption || t('cats')[p.category] || 'Makeup look';
      img.loading = 'lazy';
      img.decoding = 'async';
      const cap = document.createElement('figcaption');
      cap.textContent = captionText(p);
      btn.append(img, cap);
      grid.append(btn);
    });
    if (loadMoreBtn) loadMoreBtn.hidden = list.length <= shown;
  }

  async function loadGallery() {
    if (!grid) return;
    try {
      const res = await fetch('/api/gallery');
      if (res.ok) photos = await res.json();
    } catch {}
    renderGallery();
  }

  $$('.filter').forEach((btn) =>
    btn.addEventListener('click', () => {
      $$('.filter').forEach((b) => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      filter = btn.dataset.filter;
      shown = PAGE_SIZE;
      renderGallery();
    })
  );
  if (loadMoreBtn) loadMoreBtn.addEventListener('click', () => { shown += PAGE_SIZE; renderGallery(); });

  // ---------- lightbox ----------
  const lb = $('#lightbox');
  if (grid && lb) {
    const lbImg = $('#lbImg');
    const lbCap = $('#lbCap');
    let lbIndex = 0;

    const showLb = (i) => {
      const list = visible().slice(0, shown);
      lbIndex = (i + list.length) % list.length;
      const p = list[lbIndex];
      lbImg.src = p.url;
      lbImg.alt = p.caption || '';
      lbCap.textContent = captionText(p);
    };
    grid.addEventListener('click', (e) => {
      const item = e.target.closest('.g-item');
      if (!item) return;
      showLb(+item.dataset.index);
      lb.showModal();
    });
    $('.lb-prev').addEventListener('click', () => showLb(lbIndex - 1));
    $('.lb-next').addEventListener('click', () => showLb(lbIndex + 1));
    lb.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') showLb(lbIndex - 1);
      if (e.key === 'ArrowRight') showLb(lbIndex + 1);
    });
    lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });

    let touchX = null;
    lb.addEventListener('touchstart', (e) => (touchX = e.touches[0].clientX), { passive: true });
    lb.addEventListener('touchend', (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) showLb(lbIndex + (dx < 0 ? 1 : -1));
      touchX = null;
    });
  }

  $$('[data-close]').forEach((b) => b.addEventListener('click', () => b.closest('dialog').close()));

  // ---------- start ----------
  applyLang();
  loadGallery();
})();
