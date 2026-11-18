// =====================
// CONTOR DE VIZITE (GoatCounter)
// =====================
// Ce apare in dashboard-ul GoatCounter:
//  - /home.html, /dictionar/home.html, /biblioteca/biblioteca.html
//      = de cate ori a fost deschisa fiecare pagina (inclusiv din portal)
//  - "persoane-AAAA-LL-vizite-N"
//      = cate persoane au intrat in luna respectiva de cel putin N ori
//        N = 1: persoane unice; N = 2: au revenit cel putin o data; etc.
//        (N merge pana la 31). Totalul vizitelor din luna = suma acestor randuri
//        (vizitele de peste 31 ale aceleiasi persoane nu mai sunt numarate).
//        O vizita = paginile deschise la mai putin de 30 de minute una de alta.
//  - "contor-fara-marcaj"
//      = pagini deschise intr-un browser care nu permite marcajul de mai jos,
//        deci persoana nu a putut fi numarata
//  - aceleasi evenimente cu "portal-" in fata (ex. "portal-persoane-...")
//      = site-ul a fost deschis incorporat in alta pagina (portalul de munca).
//        Browserul tine separat marcajul din portal si cel de la accesul direct,
//        asa ca un coleg care vine si prin portal si direct apare in ambele
//        grupuri: nu aduna cele doua grupuri.
//
// Cum se deosebesc persoanele: browserul fiecarui coleg tine un marcaj
// { luna, numar de vizite, ultima pagina deschisa }. Marcajul nu contine nume sau ID
// si nu pleaca niciodata de pe dispozitiv; la GoatCounter se trimite doar
// "inca o persoana cu cel putin N vizite luna asta".
// "Persoana" inseamna de fapt un browser: o fereastra InPrivate, un browser
// care isi sterge datele la inchidere sau un alt calculator conteaza ca o
// persoana noua.
//
// Cand site-ul e incorporat in portal, se numara abia cand zona lui ajunge pe
// ecran (nu si cand e mai jos pe pagina si nimeni nu deruleaza pana la el;
// browserele foarte vechi, fara aceasta functie, il numara imediat).
//
// Daca GoatCounter este blocat (proxy, ad-blocker), nu se intampla nimic,
// iar pagina functioneaza normal.
//
// Ca sa nu fii numarat chiar tu: deschide o data
// https://aggheorghiu.github.io/home.html#toggle-goatcounter
// (inca o deschidere a linkului porneste din nou numaratoarea in acel browser).
// In portal marcajul e separat, deci vizitele tale de acolo se numara in
// continuare.
(function () {
  "use strict";

  // fs-radar = codul contului GoatCounter (https://fs-radar.goatcounter.com)
  var ENDPOINT = "https://fs-radar.goatcounter.com/count";

  var PAUZA_INTRE_VIZITE_MIN = 30;
  var VIZITE_NUMARATE_MAX = 31;
  // GoatCounter accepta cel mult 4 cereri pe secunda de pe acelasi IP si
  // acelasi browser, iar toti colegii din banca ies pe acelasi IP. Evenimentul
  // unei vizite pleaca la o secunda dupa pagina (sau imediat, daca pagina e
  // parasita mai devreme): asta reduce riscul ca o cerere sa se piarda cand
  // intra mai multi colegi deodata, dar nu il elimina.
  var DISTANTA_INTRE_CERERI_MS = 1100;
  var CHEIE_MARCAJ = "fsradar-contor";
  var PARAMETRI_CAMPANIE = /^(utm_[a-z]+|ref|src|source|campaign)$/i;
  var LUNI = [
    "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
    "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie",
  ];

  var inPortal = false;
  try {
    inPortal = window.top !== window.self;
  } catch (e) {
    inPortal = true;
  }
  var PREFIX = inPortal ? "portal-" : "";
  var PREFIX_TITLU = inPortal ? "Portal · " : "";

  // Same bot values as GoatCounter's own count.js (0 = person).
  function esteBot() {
    var w = window, d = document;
    if (w.callPhantom || w._phantom || w.phantom) return 150;
    if (w.__nightmare) return 151;
    if (d.__selenium_unwrapped || d.__webdriver_evaluate || d.__driver_evaluate) return 152;
    if (navigator.webdriver) return 153;
    return 0;
  }

  function trimite(date) {
    try {
      date.s = [screen.width, screen.height, window.devicePixelRatio || 1].join(",");
      date.b = esteBot();
      date.ns = "true"; // count every hit, even colleagues behind the same bank IP
      date.rnd = Math.random().toString(36).slice(2, 7);

      var parti = [];
      for (var k in date) {
        if (date[k] !== "" && date[k] !== null && date[k] !== undefined) {
          parti.push(encodeURIComponent(k) + "=" + encodeURIComponent(date[k]));
        }
      }
      var url = ENDPOINT + "?" + parti.join("&");

      if (navigator.sendBeacon && navigator.sendBeacon(url)) return;
      new Image().src = url;
    } catch (e) {
      // counting must never break the page
    }
  }

  // Only campaign parameters (?utm_source=portal ...) are sent; anything else
  // in the address (e.g. an ID added by the portal) stays on the device.
  function parametriCampanie() {
    var q = "";
    var bucati = location.search.replace(/^\?/, "").split("&");
    for (var i = 0; i < bucati.length; i++) {
      var cheie = bucati[i].split("=")[0];
      if (!cheie || !PARAMETRI_CAMPANIE.test(cheie)) continue;
      // a pair that is not valid UTF-8 would make GoatCounter drop the whole pageview
      try { decodeURIComponent(bucati[i].replace(/\+/g, " ")); } catch (e) { continue; }
      // whole pairs only: never cut a value (or a %XX escape) in half
      var bucata = (q ? "&" : "?") + bucati[i];
      if (q.length + bucata.length <= 1000) q += bucata;
    }
    return q;
  }

  // For other sites (e.g. the intranet portal) only the domain is sent,
  // never the full internal address; for our own pages only the path.
  function referrer() {
    var r = document.referrer || "";
    if (!r) return "";
    try {
      var u = new URL(r);
      if (u.protocol === "file:") return "";
      if (u.origin === location.origin) return (u.origin + u.pathname).slice(0, 2000);
      if (u.origin !== "null") return u.origin + "/";
      // android-app://..., about:... have an opaque origin
      return u.host ? u.protocol + "//" + u.host + "/" : "";
    } catch (e) {
      return "";
    }
  }

  function trimitePagina() {
    trimite({
      p: location.pathname,
      // no lone half of an emoji at the cut: encodeURIComponent would throw
      t: String(document.title).slice(0, 1000).replace(/[\uD800-\uDBFF]$/, ""),
      r: referrer(),
      q: parametriCampanie(),
    });
  }

  function trimiteEveniment(nume, titlu) {
    trimite({ p: PREFIX + nume, t: PREFIX_TITLU + titlu, e: "true" });
  }

  // Event waiting for its turn; sent at once if the page is closed or hidden.
  var inAsteptare = [];

  function programeaza(nume, titlu) {
    var ev = { nume: nume, titlu: titlu, trimis: false };
    ev.timer = setTimeout(function () {
      trimiteAcum(ev);
    }, DISTANTA_INTRE_CERERI_MS);
    inAsteptare.push(ev);
  }

  function trimiteAcum(ev) {
    if (ev.trimis) return;
    ev.trimis = true;
    clearTimeout(ev.timer);
    // counting was switched off (#toggle-goatcounter) while the event waited
    try {
      if (window.localStorage.getItem("skipgc") === "t") return;
    } catch (e) {}
    trimiteEveniment(ev.nume, ev.titlu);
  }

  function trimiteTot() {
    for (var i = 0; i < inAsteptare.length; i++) trimiteAcum(inAsteptare[i]);
  }

  window.addEventListener("pagehide", trimiteTot);
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") trimiteTot();
  });

  // null = this browser does not allow storage (e.g. site embedded in a portal
  // with third-party storage blocked)
  function citesteMarcaj() {
    var brut;
    try {
      brut = window.localStorage.getItem(CHEIE_MARCAJ);
    } catch (e) {
      return null;
    }
    try {
      var m = JSON.parse(brut);
      if (m && typeof m === "object") return m;
    } catch (e) {}
    return {};
  }

  function scrieMarcaj(m) {
    try {
      window.localStorage.setItem(CHEIE_MARCAJ, JSON.stringify(m));
      return true;
    } catch (e) {
      return false;
    }
  }

  function numarIntreg(v) {
    v = Number(v);
    return isFinite(v) && v > 0 ? Math.floor(v) : 0;
  }

  function faraMarcaj() {
    programeaza(
      "contor-fara-marcaj",
      "Pagină deschisă fără marcaj (persoana nu a putut fi numărată)"
    );
  }

  function numaraPersoana() {
    var acum = new Date();
    var luna = acum.getFullYear() + "-" + ("0" + (acum.getMonth() + 1)).slice(-2);

    var m = citesteMarcaj();
    if (m === null) {
      faraMarcaj();
      return;
    }

    if (m.luna !== luna) m = { luna: luna, vizite: 0, ultima: 0 };
    var vizite = numarIntreg(m.vizite);
    var ultima = numarIntreg(m.ultima);

    // a clock moved backwards (ultima in the future) is not a new visit
    var vizitaNoua = !(ultima && acum.getTime() - ultima < PAUZA_INTRE_VIZITE_MIN * 60000);
    if (vizitaNoua) vizite++;

    if (!scrieMarcaj({ luna: luna, vizite: vizite, ultima: acum.getTime() })) {
      faraMarcaj();
      return;
    }
    if (!vizitaNoua || vizite > VIZITE_NUMARATE_MAX) return;

    var numeLuna = LUNI[acum.getMonth()] + " " + acum.getFullYear();
    programeaza(
      "persoane-" + luna + "-vizite-" + vizite,
      vizite === 1
        ? numeLuna + ": persoane unice (cel puțin 1 vizită)"
        : numeLuna + ": persoane cu cel puțin " + vizite + " vizite"
    );
  }

  // Same rules as GoatCounter's count.js, except that pages embedded in a
  // portal (iframe) ARE counted.
  function nuSeNumara() {
    if (location.protocol === "file:") return true;
    if (/(localhost$|^127\.|^10\.|^172\.(1[6-9]|2[0-9]|3[0-1])\.|^192\.168\.|^0\.0\.0\.0$)/.test(location.hostname)) {
      return true;
    }
    try {
      if (window.localStorage.getItem("skipgc") === "t") return true;
    } catch (e) {}
    return false;
  }

  function porneste() {
    try {
      if (nuSeNumara()) return;
      trimitePagina();
      numaraPersoana();
    } catch (e) {}
  }

  // like count.js: a page opened in a background tab (or prerendered) is
  // counted when it is actually viewed
  function candTabulEVizibil(f) {
    // Chrome makes the page "visible" BEFORE it ends prerendering; counting then
    // would run before the #toggle-goatcounter check and send requests marked
    // "Sec-Purpose: prefetch;prerender". Wait for prerenderingchange (registered
    // after the toggle's own listener, so the toggle always runs first).
    if (document.prerendering) {
      document.addEventListener("prerenderingchange", function () {
        candTabulEVizibil(f);
      }, { once: true });
      return;
    }
    if (!("visibilityState" in document) || document.visibilityState === "visible") {
      f();
      return;
    }
    var laAfisare = function () {
      if (document.visibilityState !== "visible") return;
      document.removeEventListener("visibilitychange", laAfisare);
      f();
    };
    document.addEventListener("visibilitychange", laAfisare);
  }

  // embedded in the portal: wait until the site's area is actually on screen
  function candSiteulEPeEcran(f) {
    if (!inPortal || typeof window.IntersectionObserver !== "function") {
      candTabulEVizibil(f);
      return;
    }
    var gata = false;
    var io;
    try {
      io = new IntersectionObserver(function (intrari) {
        for (var i = 0; i < intrari.length; i++) {
          if (intrari[i].isIntersecting && !gata) {
            gata = true;
            io.disconnect();
            candTabulEVizibil(f);
            return;
          }
        }
      });
      io.observe(document.documentElement);
    } catch (e) {
      if (!gata) {
        gata = true;
        candTabulEVizibil(f);
      }
    }
  }

  function comutaPentruMine() {
    try {
      if (window.localStorage.getItem("skipgc") === "t") {
        window.localStorage.removeItem("skipgc");
        alert("Contorul FS Radar numără din nou vizitele din acest browser.");
      } else {
        window.localStorage.setItem("skipgc", "t");
        alert("Contorul FS Radar NU mai numără vizitele din acest browser.");
      }
    } catch (e) {}
  }

  function verificaComutarea() {
    if (location.hash !== "#toggle-goatcounter") return;
    var comuta = function () {
      comutaPentruMine();
      // drop the hash so that F5 / Back does not toggle again
      try {
        history.replaceState(history.state, "", location.href.replace(/#.*$/, ""));
      } catch (e) {}
    };
    // a prerendered page cannot show the alert: wait until it is really opened
    if (document.prerendering) {
      document.addEventListener("prerenderingchange", comuta, { once: true });
    } else {
      comuta();
    }
  }

  try {
    verificaComutarea();
    // link opened in a tab that already shows the site (only the hash changes)
    window.addEventListener("hashchange", function () {
      try {
        verificaComutarea();
      } catch (e) {}
    });
    candSiteulEPeEcran(porneste);
  } catch (e) {}
})();
