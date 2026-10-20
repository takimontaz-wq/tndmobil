/* ==========================================================================
   TND MOBILE — WSPÓLNY SKRYPT
   Wstawia nagłówek i stopkę na każdą podstronę, uzupełnia dane z config.js,
   obsługuje menu mobilne, zakładki cennika i formularze.
   Zwykle NIE musisz tu nic zmieniać — dane edytujesz w config.js,
   a pozycje menu w tablicy MENU poniżej.
   ========================================================================== */
(function () {
  var C = window.TND || {};
  var here = (location.pathname.split("/").pop() || "index.html");

  /* ---------- Menu (kolejność jak w nagłówku) ---------- */
  var USLUGI = [
    ["sezonowa-wymiana-opon.html", "Sezonowa wymiana opon"],
    ["mobilna-wulkanizacja.html", "Mobilna wulkanizacja"],
    ["naprawa-przebitej-opony.html", "Naprawa przebitej opony"],
    ["floty.html", "Obsługa flot firmowych"]
  ];
  var MENU = [
    ["index.html", "Home"],
    ["uslugi.html", "Usługi", USLUGI],
    ["jak-dzialamy.html", "Jak działamy"],
    ["faq.html", "FAQ"],
    ["cennik.html", "Cennik"],
    ["kontakt.html", "Kontakt"]
  ];

  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var tel = function (n) { var d = String(n || "").replace(/[^\d+]/g, ""); if (d && d[0] !== "+" && d.length === 9) d = "+48" + d; return "tel:" + d; };
  var wa = function () { return "https://wa.me/" + C.whatsapp + (C.whatsappTekst ? "?text=" + encodeURIComponent(C.whatsappTekst) : ""); };
  var ICO_TEL = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>';
  var ICO_WA = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>';
  var hasWa = !!C.whatsapp;
  var slug = function (t) { return String(t).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ł/g, "l").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); };
  var fill = function (s) { return String(s).replace(/\{(\w+)\}/g, function (m, k) { return C[k] != null ? C[k] : m; }); };

  if (C.skin && C.skin !== "stal") document.documentElement.setAttribute("data-skin", C.skin);

  var LOGO_SVG = '<picture class="logo-mark"><source srcset="img/logo-bus.webp" type="image/webp"><img src="img/logo-bus.png" alt="" width="100" height="46"></picture>';

  /* ---------- Nagłówek ---------- */
  function header() {
    var items = MENU.map(function (m) {
      var cur = m[0] === here ? ' aria-current="page"' : "";
      if (m[2]) {
        var sub = m[2].map(function (s) {
          return '<li><a href="' + s[0] + '"' + (s[0] === here ? ' aria-current="page"' : "") + ">" + esc(s[1]) + "</a></li>";
        }).join("");
        return '<li class="has-sub"><button type="button" aria-expanded="false">' + esc(m[1]) + ' ▾</button><ul class="sub"><li><a href="' + m[0] + '">Wszystkie usługi</a></li>' + sub + "</ul></li>";
      }
      return '<li><a href="' + m[0] + '"' + cur + ">" + esc(m[1]) + "</a></li>";
    }).join("");

    var t2 = C.telefon2 ? '<a href="' + tel(C.telefon2) + '"><span>' + esc(C.telefon2Opis) + ':</span>' + esc(C.telefon2) + "</a>" : "";

    return (
      '<div class="topbar"><div class="wrap">' +
        '<div class="tb-left"><a href="' + tel(C.telefonIntl || C.telefon) + '"><span>Umów wymianę</span>' + esc(C.telefon) + "</a>" + t2 +
        (hasWa ? '<a href="' + wa() + '" target="_blank" rel="noopener">WhatsApp</a>' : "") +
        '<a href="mailto:' + esc(C.email) + '"><span>E-mail</span>' + esc(C.email) + "</a></div>" +
        '<div class="tb-hours">' + esc(C.godziny) + "</div>" +
      "</div></div>" +
      '<nav class="nav" aria-label="Główne menu"><div class="wrap">' +
        '<a class="logo" href="index.html">' + LOGO_SVG + "<span><b>" + esc(C.nazwa) + "</b><small>" + esc(C.slogan) + "</small></span></a>" +
        '<button class="burger" type="button" aria-expanded="false" aria-controls="menu">Menu</button>' +
        '<ul class="menu" id="menu">' + items +
          '<li class="menu-cta"><a class="btn btn-hot" href="' + tel(C.telefonIntl || C.telefon) + '">' + ICO_TEL + "Umów wymianę opon</a>" +
          (hasWa ? '<a class="btn btn-ghost btn-wa" href="' + wa() + '" target="_blank" rel="noopener">' + ICO_WA + "WhatsApp</a>" : "") + "</li></ul>" +
        '<a class="btn btn-hot nav-cta" href="' + tel(C.telefonIntl || C.telefon) + '">' + ICO_TEL + esc(C.telefon) + "</a>" +
      "</div></nav>"
    );
  }

  /* ---------- Stopka ---------- */
  function footer() {
    var areas = (C.obszar || []).map(function (a) {
      return '<li><a href="obszar-dzialania.html#' + slug(a.miasto) + '">' + esc(a.miasto) + "</a></li>";
    }).join("");
    var wiedza = (C.wiedza || []).map(function (w) { return '<li><a href="' + esc(w.url || "wiedza.html") + '">' + esc(w.tytul) + "</a></li>"; }).join("");
    var socials = (C.facebook ? '<a href="' + esc(C.facebook) + '" aria-label="Facebook">fb</a>' : "") + (C.instagram ? '<a href="' + esc(C.instagram) + '" aria-label="Instagram">ig</a>' : "");
    return (
      '<footer class="footer"><div class="wrap"><div class="cols">' +
        '<div class="f-brand"><a class="logo" href="index.html">' + LOGO_SVG + "<span><b>" + esc(C.nazwa) + "</b><small>" + esc(C.slogan) + "</small></span></a>" +
          "<p>" + esc(C.hasloStopka) + "</p>" +
          '<div class="f-contact stack" style="gap:.4rem"><a class="hot" href="' + tel(C.telefonIntl || C.telefon) + '">' + esc(C.telefon) + "</a>" +
          (hasWa ? '<a href="' + wa() + '" target="_blank" rel="noopener">WhatsApp →</a>' : "") +
          (C.telefon2 ? '<a href="' + tel(C.telefon2) + '">' + esc(C.telefon2) + "</a>" : "") +
          '<a href="mailto:' + esc(C.email) + '">' + esc(C.email) + "</a></div>" +
          '<div class="socials">' + socials + "</div>" +
          "</div>" +
        '<div><h4>Menu</h4><ul>' +
          '<li><a href="index.html">Home</a></li><li><a href="uslugi.html">Usługi</a></li><li><a href="cennik.html">Cennik</a></li>' +
          '<li><a href="floty.html">Obsługa flot</a></li><li><a href="obszar-dzialania.html">Obszar działania</a></li><li><a href="faq.html">FAQ</a></li>' +
          '<li><a href="kontakt.html">Kontakt</a></li><li><a href="regulamin.html">Regulamin usług</a></li><li><a href="polityka-prywatnosci.html">Polityka prywatności</a></li></ul></div>' +
        "<div><h4>Gdzie działamy</h4><ul>" + areas + "</ul></div>" +
        '<div><h4>Wiedza</h4><ul>' + wiedza + '<li><a href="wiedza.html"><b>Wszystkie artykuły →</b></a></li></ul></div>' +
      "</div>" +
      '<div class="legal"><span>© ' + new Date().getFullYear() + " " + esc(C.firma) + " · NIP " + esc(C.nip) + "</span><span>" + esc(C.adres) + "</span></div>" +
      "</div></footer>" +
      '<div class="fab">' + (hasWa ? '<a class="fab-wa" href="' + wa() + '" target="_blank" rel="noopener" aria-label="Napisz na WhatsApp">' + ICO_WA + "</a>" : "") +
      '<a class="fab-call" href="' + tel(C.telefonIntl || C.telefon) + '" aria-label="Zadzwoń">' + ICO_TEL + "</a></div>"
    );
  }

  /* ---------- Wstawienie ---------- */
  var h = document.getElementById("site-header");
  var f = document.getElementById("site-footer");
  if (h) h.outerHTML = header();
  if (f) f.outerHTML = footer();

  /* Podmiana danych w treści: <span data-t="telefon"></span>, <a data-href="tel"> */
  document.querySelectorAll("[data-t]").forEach(function (el) {
    var v = C[el.getAttribute("data-t")];
    if (Array.isArray(v)) v = v.join(", ");
    if (v != null && v !== "") el.textContent = v;
  });
  document.querySelectorAll("[data-href]").forEach(function (el) {
    var k = el.getAttribute("data-href");
    if (k === "tel") el.href = tel(C.telefonIntl || C.telefon);
    else if (k === "wa") { if (hasWa) { el.href = wa(); el.target = "_blank"; el.rel = "noopener"; } else el.hidden = true; }
    else if (k === "tel2") el.href = tel(C.telefon2 || C.telefon);
    else if (k === "mail") el.href = "mailto:" + C.email;
    else if (C[k]) el.href = C[k];
  });

  /* Ikony w przyciskach: <span data-ico="tel"></span> */
  document.querySelectorAll("[data-ico]").forEach(function (el) { el.outerHTML = el.getAttribute("data-ico") === "wa" ? ICO_WA : ICO_TEL; });

  /* Sezon: etykieta zmienia się sama wg miesiąca */
  var m = new Date().getMonth(); // 0 = styczeń
  var sezon = (m >= 8 && m <= 11) ? "Teraz: zmiana na zimowe" : (m >= 2 && m <= 5) ? "Teraz: zmiana na letnie" : "Umów wymianę z wyprzedzeniem";
  document.querySelectorAll("[data-season]").forEach(function (el) { el.textContent = sezon; });
  /* Cena "od" = pierwszy wiersz zakładki "Wymiana opon" w cenniku */
  try { var od = C.cenaOd || C.cennik[0].wiersze[0][1]; document.querySelectorAll("[data-price-from]").forEach(function (el) { el.textContent = od; }); } catch (e) {}

  /* Płatności */
  document.querySelectorAll("[data-pay]").forEach(function (el) {
    el.innerHTML = (C.platnosci || []).map(function (p) { return '<span class="chip">' + esc(p) + "</span>"; }).join("");
  });

  /* Obszar działania */
  /* Obszar działania jako zakładki: Gdynia / Sopot / Gdańsk / Okolice */
  document.querySelectorAll("[data-areas]").forEach(function (el) {
    var list = C.obszar || [];
    el.className = "area-tabs";
    el.innerHTML = '<div class="tabs" role="tablist">' + list.map(function (a, i) {
      return '<button class="tab" role="tab" data-area="' + slug(a.miasto) + '" aria-selected="' + (i === 0) + '">' + esc(a.miasto) + "</button>";
    }).join("") + "</div>" + list.map(function (a, i) {
      return '<div class="area-panel" role="tabpanel" id="' + slug(a.miasto) + '"' + (i ? " hidden" : "") + '><ul>' +
        a.dzielnice.map(function (d) { return '<li class="chip">' + esc(d) + "</li>"; }).join("") + "</ul></div>";
    }).join("");
    var pick = function (id) {
      el.querySelectorAll(".tab").forEach(function (b) { b.setAttribute("aria-selected", b.getAttribute("data-area") === id); });
      el.querySelectorAll(".area-panel").forEach(function (p) { p.hidden = p.id !== id; });
    };
    el.addEventListener("click", function (e) { var b = e.target.closest(".tab"); if (b) pick(b.getAttribute("data-area")); });
    var h = location.hash.slice(1); if (h && el.querySelector("#" + h)) pick(h);
  });

  /* Mapa Google (adres mapy w config.js → mapaUrl) */
  document.querySelectorAll("[data-map]").forEach(function (el) {
    if (!C.mapaUrl) { el.hidden = true; return; }
    el.innerHTML = '<iframe src="' + esc(C.mapaUrl) + '" title="Mapa obszaru działania — Trójmiasto" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>';
  });

  /* Lista artykułów */
  document.querySelectorAll("[data-wiedza]").forEach(function (el) {
    el.innerHTML = (C.wiedza || []).map(function (w) {
      var tag = w.url ? 'a class="card" href="' + esc(w.url) + '"' : 'div class="card"';
      return '<' + tag + '>' + (w.zdjecie ? '<picture class="photo"><source srcset="img/' + esc(w.zdjecie) + '.webp" type="image/webp"><img src="img/' + esc(w.zdjecie) + '.jpg" alt="' + esc(w.alt || w.tytul) + '" width="1200" height="900" loading="lazy"></picture>' : '<div class="ph ph-43"><div><b>ZDJĘCIE ARTYKUŁU</b>1200×900</div></div>') + '<h3>' + esc(w.tytul) + "</h3><p>" + esc(w.zajawka) + '</p><span class="more">' + (w.url ? "Czytaj →" : "Wkrótce") + '</span>' + (w.url ? "</a>" : "</div>");
    }).join("");
  });


  /* ---------- Galeria: zapętlona karuzela (środek duży, boki mniejsze i ciemniejsze) ---------- */
  document.querySelectorAll("[data-gal]").forEach(function (gal) {
    var slides = [].slice.call(gal.querySelectorAll(".gal-slide"));
    var n = slides.length, cur = 0, timer = null;
    if (!n) return;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function render() {
      var w = slides[0].offsetWidth;
      slides.forEach(function (s, i) {
        var d = ((i - cur) % n + n) % n; if (d > n / 2) d -= n;      /* najkrótsza odległość po okręgu */
        var a = Math.abs(d);
        var scale = a === 0 ? 1 : a === 1 ? .72 : .55;
        var x = d === 0 ? 0 : Math.sign(d) * (w * .5 + w * .72 * .5 * .82 + (a - 1) * w * .5);
        s.style.transform = "translateX(" + x + "px) scale(" + scale + ")";
        s.style.setProperty("--dim", a === 0 ? 0 : a === 1 ? .55 : .7);
        s.style.opacity = a > 2 ? 0 : 1;
        s.style.zIndex = 10 - a;
        s.style.pointerEvents = a > 2 ? "none" : "";
        s.classList.toggle("is-active", a === 0);
        s.setAttribute("aria-hidden", a === 0 ? "false" : "true");
      });
    }
    function go(k) { cur = ((k % n) + n) % n; render(); }
    function start() { if (reduce) return; stop(); timer = setInterval(function () { go(cur + 1); }, 3500); }
    function stop() { if (timer) clearInterval(timer); timer = null; }
    gal.querySelector(".gal-prev").addEventListener("click", function () { go(cur - 1); start(); });
    gal.querySelector(".gal-next").addEventListener("click", function () { go(cur + 1); start(); });
    slides.forEach(function (s, i) { s.addEventListener("click", function () { if (i !== cur) { go(i); start(); } }); });
    gal.addEventListener("mouseenter", stop); gal.addEventListener("mouseleave", start);
    var x0 = null;
    gal.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; stop(); }, { passive: true });
    gal.addEventListener("touchend", function (e) {
      if (x0 !== null) { var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1)); }
      x0 = null; start();
    });
    document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });
    window.addEventListener("resize", render);
    render(); start();
  });

  /* ---------- Cennik z config.js ---------- */
  var pr = document.querySelector("[data-cennik]");
  if (pr && C.cennik) {
    var tabs = '<div class="tabs" role="tablist">' + C.cennik.map(function (t, i) {
      return '<button class="tab" role="tab" id="tab-' + t.id + '" aria-controls="p-' + t.id + '" aria-selected="' + (i === 0) + '">' + esc(t.nazwa) + "</button>";
    }).join("") + "</div>";
    var panels = C.cennik.map(function (t, i) {
      var rows = t.wiersze.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + esc(c) + "</td>"; }).join("") + "</tr>"; }).join("");
      var notes = t.uwagi.filter(function (u) { return fill(u).indexOf("{") < 0; }); notes = notes.length ? '<ul class="ticks">' + t.uwagi.map(function (u) { return '<li class="note">' + esc(fill(u)) + "</li>"; }).join("") + "</ul>" : "";
      return '<div class="panel" role="tabpanel" id="p-' + t.id + '" aria-labelledby="tab-' + t.id + '"' + (i ? " hidden" : "") + ">" +
        '<div class="stack" style="gap:.5rem"><h3>' + esc(t.nazwa) + '</h3><p class="note">' + esc(t.opis) + "</p></div>" +
        '<div class="table-wrap"><table class="price"><thead><tr>' + t.kolumny.map(function (k) { return "<th>" + esc(k) + "</th>"; }).join("") + "</tr></thead><tbody>" + rows + "</tbody></table></div>" + notes + "</div>";
    }).join("");
    pr.innerHTML = tabs + panels;
    var select = function (id) {
      pr.querySelectorAll(".tab").forEach(function (b) { b.setAttribute("aria-selected", b.id === "tab-" + id); });
      pr.querySelectorAll(".panel").forEach(function (p) { p.hidden = p.id !== "p-" + id; });
    };
    pr.addEventListener("click", function (e) {
      var b = e.target.closest(".tab"); if (b) select(b.id.slice(4));
    });
    var hash = location.hash.slice(1);
    if (hash && document.getElementById("p-" + hash)) select(hash);
  }

  /* ---------- Menu mobilne ---------- */
  var burger = document.querySelector(".burger");
  var menu = document.getElementById("menu");
  if (burger && menu) burger.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  document.querySelectorAll(".has-sub > button").forEach(function (b) {
    b.addEventListener("click", function () {
      var li = b.parentElement, open = li.classList.toggle("open");
      b.setAttribute("aria-expanded", open);
    });
  });

  /* ---------- Formularze (szablon: bez wysyłki na serwer) ----------
     Żeby formularz naprawdę wysyłał wiadomości, podłącz np. Formspree,
     Web3Forms, Netlify Forms albo backend — patrz README.md. */
  /* Formularze → WhatsApp: składa wiadomość z pól i otwiera WhatsApp z gotowym tekstem */
  document.querySelectorAll("form[data-wa]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var lines = ["*" + form.getAttribute("data-wa") + "*"];
      form.querySelectorAll("label").forEach(function (lab) {
        var f = lab.querySelector("input, select, textarea");
        if (!f || f.type === "checkbox") return;
        var v = String(f.value || "").trim(); if (!v) return;
        var name = (lab.childNodes[0] && lab.childNodes[0].textContent || "").replace(/\s*\(opcjonalnie\)/, "").trim();
        lines.push(name + ": " + v);
      });
      var url = "https://wa.me/" + (C.whatsapp || "") + "?text=" + encodeURIComponent(lines.join("\n"));
      var w = window.open(url, "_blank");
      if (!w) location.href = url;
    });
  });

  document.querySelectorAll("form[data-demo]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var msg = form.querySelector(".form-msg");
      if (!msg) { msg = document.createElement("p"); msg.className = "form-msg"; form.appendChild(msg); }
      msg.textContent = "To jest szablon — formularz nie jest jeszcze podłączony. Po podłączeniu tutaj pojawi się potwierdzenie wysłania.";
    });
  });
})();
