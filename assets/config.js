/* ==========================================================================
   TND MOBIL — PLIK KONFIGURACYJNY
   --------------------------------------------------------------------------
   To jest JEDYNE miejsce, w którym podmieniasz najważniejsze dane firmy.
   Telefon, e-mail, miasta, ceny, WhatsApp itd. trafiają stąd
   automatycznie na wszystkie podstrony (nagłówek, stopka, przyciski, cennik).

   Dane wg odpowiedzi klienta z 12.10.2026.
   Miejsca oznaczone "DO POTWIERDZENIA" czekają na odpowiedź klienta.
   ========================================================================== */

window.TND = {
  /* --- Marka ------------------------------------------------------------ */
  nazwa: "TND Mobil",
  slogan: "Mobilny serwis opon",
  hasloStopka: "Mobilny serwis opon w Gdyni i całym Trójmieście — 24 h na dobę, 7 dni w tygodniu. Przyjeżdżamy tam, gdzie stoi Twoje auto.",
  skin: "stal",     // motyw bazowy — aktualny wygląd ustawiają bloki na końcu style.css

  /* --- Kontakt ------------------------------------------------------------ */
  telefon: "888 582 459",                        // numer firmowy / awarie (pokazywany wszędzie)
  telefonIntl: "+48888582459",
  telefon2: "",                                  // drugi numer — nie pokazujemy
  telefon2Opis: "Tel. 2",
  email: "tndtireswap@interia.pl",
  whatsapp: "48888582459",                       // WhatsApp na numerze firmowym
  whatsappTekst: "Dzień dobry, chcę umówić wymianę opon.",
  godziny: "Czynne 24/7 · po 22:00 tylko awarie",

  /* --- Dane firmy (stopka, regulamin, polityka prywatności) ------------- */
  firma: "TND Mobil",
  adres: "ul. Adm. J. Unruga 37F/5, 81-181 Gdynia",
  nip: "9581518647",
  regon: "",                                     // nieobowiązkowe — zostaw "" by nie pokazywać
  doswiadczenie: "18 lat",                       // w branży motoryzacyjnej
  vat: "Firma zwolniona z VAT — podane ceny są cenami końcowymi.",

  /* --- Linki zewnętrzne (zostaw "" by ukryć) ---------------------------- */
  facebook: "",                                  // DO UZUPEŁNIENIA po zmianie profilu na Facebooku
  instagram: "",
  googleOpinieUrl: "https://g.page/r/CeNV8b5J-3VQEBM/review",  // link do wystawienia opinii w Google (Profil Firmy)

  /* --- Obszar działania ------------------------------------------------- */
  miastoGlowne: "Gdynia",
  // Mapa Google wyśrodkowana na Trójmieście. Inną mapę zrobisz w Google Maps: Udostępnij → Umieść mapę → skopiuj adres z src="…"
  mapaUrl: "https://maps.google.com/maps?ll=54.50,18.45&z=10&t=m&hl=pl&output=embed",
  obszar: [
    { miasto: "Gdynia", dzielnice: ["Śródmieście", "Działki Leśne", "Grabówek", "Chylonia", "Cisowa", "Obłuże", "Oksywie", "Pogórze", "Orłowo", "Redłowo", "Mały Kack", "Wielki Kack", "Karwiny", "Dąbrowa", "Witomino", "Chwarzno-Wiczlino"] },
    { miasto: "Sopot", dzielnice: ["Dolny Sopot", "Górny Sopot", "Kamienny Potok", "Brodwino"] },
    { miasto: "Gdańsk", dzielnice: ["Oliwa", "Przymorze", "Zaspa", "Wrzeszcz", "Żabianka", "Osowa", "Śródmieście"] },
    { miasto: "Okolice", dzielnice: ["Rumia", "Reda", "Wejherowo", "Szemud", "Kielno", "Koleczkowo", "Bojano", "Chwaszczyno", "Gmina Puck"] }
  ],

  /* --- Liczby, które pojawiają się w tekstach --------------------------- */
  cenaOd: "100 zł",                              // cena "od" w bloku Sezonowa wymiana opon (wymiana kół od 100 zł)
  dojazdCena: "100 zł",                          // cena dojazdu (raz na adres) — zmiana tutaj podmienia ją wszędzie
  felgi: "12–21\"",
  czasWymiany: "30–45 minut",
  platnosci: ["Gotówka", "Karta", "BLIK", "Przelew"],

  /* --- Wiedza / blog (lista w stopce i na stronie Wiedza) ---------------
     zdjecie: nazwa pliku z folderu img/ bez końcówki (potrzebne .webp i .jpg 1200×900)
     url: adres gotowego artykułu — bez url kafelek pokazuje „Wkrótce” */
  wiedza: [
    { tytul: "Kiedy zmienić opony letnie na zimowe?", url: "opony-zimowe-kiedy-zmienic.html", zdjecie: "wiedza-zimowe", alt: "Wymiana koła przez serwis TND Mobil", zajawka: "Zasada 7°C, głębokość bieżnika i wiek opony." },
    { tytul: "Kiedy wrócić na opony letnie?", url: "opony-letnie-kiedy-zmienic.html", zdjecie: "wiedza-letnie", alt: "Bus serwisowy TND Mobil", zajawka: "Jak nie przegapić momentu i nie przepłacić w sezonie." },
    { tytul: "Przebita opona — co zrobić krok po kroku", url: "przebita-opona-co-zrobic.html", zdjecie: "wiedza-przebita", alt: "Koło na montażownicy w busie TND Mobil", zajawka: "Kiedy da się naprawić, a kiedy trzeba wymienić." },
    { tytul: "Jak odczytać rozmiar opony?", url: "jak-odczytac-rozmiar-opony.html", zdjecie: "wiedza-rozmiar", alt: "Opona z oznaczeniem rozmiaru na boku", zajawka: "205/55 R16 91V — co oznacza każdy znak." }
  ],

  /* --- CENNIK (ceny od klienta, 12.10.2026) ----------------------------- */
  /* Tabela może mieć 2 albo 3 kolumny — wystarczy dopisać nazwę kolumny
     w "kolumny" i kolejną wartość w każdym wierszu. */
  cennik: [
    {
      id: "opony", nazwa: "Wymiana opon",
      opis: "Sezonowa wymiana: zdjęcie opon z felg, założenie drugiego kompletu i wyważenie. Cena za komplet 4 kół.",
      kolumny: ["Rozmiar felgi", "Felga stalowa", "Felga aluminiowa"],
      wiersze: [["12–16\"", "150 zł", "200 zł"], ["17–19\"", "200 zł", "250 zł"], ["20–21\"", "250 zł", "300 zł"]],
      uwagi: ["Do ceny doliczamy dojazd — {dojazdCena}. Przy kilku autach pod jednym adresem dojazd liczymy raz.", "Opony run-flat: +50 zł.", "Przy kilku autach pod jednym adresem — zapytaj o rabat.", "{vat}"]
    },
    {
      id: "uslugi", nazwa: "Pozostałe usługi",
      opis: "Usługi wykonywane osobno albo przy wymianie.",
      kolumny: ["Usługa", "Cena"],
      wiersze: [["Wymiana kół (komplet)", "100 zł"], ["Wyważanie kół (komplet)", "100 zł"], ["Naprawa opony", "80 zł"], ["Dopłata za opony run-flat", "50 zł"], ["Utylizacja starej opony", "10 zł / szt."]],
      uwagi: ["Do ceny doliczamy dojazd — {dojazdCena}.", "{vat}"]
    },
    {
      id: "awaria", nazwa: "Awarie i noc",
      opis: "Przebita opona, „kapeć” w trasie albo pod domem — przyjeżdżamy całą dobę.",
      kolumny: ["Usługa", "Cena"],
      wiersze: [["Naprawa opony", "80 zł"], ["Dopłata za wyjazd w nocy (po 22:00)", "od 100 zł"]],
      uwagi: ["Po 22:00 przyjeżdżamy tylko do awarii — wymianę sezonową umówimy na dzień.", "Do ceny doliczamy dojazd — {dojazdCena}.", "{vat}"]
    },
    {
      id: "floty", nazwa: "Dla firm i flot",
      opis: "Floty od 3 aut — wycena indywidualna, termin ustalamy z firmą (do 22:00).",
      kolumny: ["Usługa", "Cena"],
      wiersze: [["Wymiana opon / kół w całej flocie", "wycena indywidualna"], ["Naprawy i awarie aut firmowych", "wg cennika"]],
      uwagi: ["Wystawiamy faktury.", "Zadzwoń: {telefon} albo napisz: {email}."]
    }
  ]
};
