// label carousel
const labels = [
  `
  De aici poți începe drumul tău în domeniul sancțiunilor financiare.
  Aplicarea regulilor fără înțelegerea contextului istoric, politic și socio-cultural ar fi incompletă.
  Îți oferim punctul de plecare pentru a înțelege lumea din spatele sancțiunilor.
  `,
];

let currentIndex = 0;
const labelElement = document.getElementById("heroLabel");

function updateLabel() {
  labelElement.style.opacity = 0;

  setTimeout(() => {
    labelElement.textContent = labels[currentIndex];
    currentIndex = (currentIndex + 1) % labels.length;

    labelElement.style.opacity = 1;
  }, 500);
}

updateLabel();
setInterval(updateLabel, 15000);

// =====================
// DATA
// =====================
const filme = [
  {
    type: "movie",
    title: "The Wolf of Wall Street",
    cast: ["Leonardo DiCaprio", "Jonah Hill", "Margot Robbie"],
    cover: "covers/the_wolf_of_wall_street.jpg",
    year: 2013,
    rating: "8.2 IMDb",
    description:
      "Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.",
  },
  {
    type: "movie",
    title: "Dirty Money",
    cast: ["Donald Trump", "Loretta Lynch", "Matt Taibbi"],
    cover: "covers/Dirty-money.jpg",
    year: 2018,
    rating: "8.1 IMDb",
    description:
      "Stories about corporate corruption, securities fraud and creative accounting. Film-documentary based on real stories.",
  },
  {
    type: "movie",
    title: "Inside Job",
    cast: ["Matt Damon", "Gylfi Zoega", "Andri Snær Magnason"],
    cover: "covers/inside_job.jpg",
    year: 2010,
    rating: "8.2 IMDb",
    description:
      "Takes a closer look at what brought about the 2008 financial meltdown.",
  },
  {
    type: "movie",
    title: "The Corporation",
    cast: ["Mikela Jay", "Rob Beckwermert", "Christopher Gora"],
    cover: "covers/the_corporation.jpg",
    year: 2003,
    rating: "8.0 IMDb",
    description:
      "Analyzes the concept of the corporation throughout recent history up to its present-day dominance.",
  },
  {
    type: "movie",
    title: "Inequality for All",
    cast: ["Robert Reich", "Tyne Daly", "Candice Bergen"],
    cover: "covers/inequality.jpg",
    year: 2013,
    rating: "8.0 IMDb",
    description:
      "A documentary that follows former U.S. Labor Secretary Robert Reich as he looks to raise awareness of the country's widening economic gap.",
  },
  {
    type: "movie",
    title: "Capitalism: A Love Story",
    cast: ["William Black", "Jimmy Carter", "Elijah Cummings"],
    cover: "covers/capitalism_a_love_story.jpg",
    year: 2009,
    rating: "7.4 IMDb",
    description:
      "An examination of the social costs of corporate interests pursuing profits at the expense of the public good.",
  },
  {
    type: "movie",
    title: "Wall Street",
    cast: ["Charlie Sheen", "Tamara Tunie", "Franklin Cover"],
    cover: "covers/wall_street.jpg",
    year: 1987,
    rating: "7.3 IMDb",
    description:
      "An impatient young stockbroker is willing to do anything to get to the top, including trading on illegal inside information taken through a ruthless, greedy corporate raider who takes the youth under his wing.",
  },
  {
    type: "movie",
    title: "1929: The Great Crash",
    cast: ["Bill Paterson", "Karen Blumenthal", "William Bologna"],
    cover: "covers/the_great_crash.jpg",
    year: 2009,
    rating: "7.3 IMDb",
    description:
      "The major causes and the consequences of the humankinds greatest economic depression.",
  },
  {
    type: "movie",
    title: "The Big Short",
    cast: ["Christian Bale", "Steve Carell", "Ryan Gosling"],
    cover: "covers/The_Big_Short_movie.jpg",
    year: 2015,
    rating: "7.8 IMDb",
    description:
      "In 2006-2007 a group of investors bet against the United States mortgage market. In their research, they discover how flowed and corrupt the market is.",
  },
  {
    type: "movie",
    title: "9 days inside Taliban-controlled Afghanistan",
    cast: ["ABC News"],
    cover: "covers/afghanistan.png",
    year: 2026,
    rating: "N/A",
    description:
      "Afghanistan has changed dramatically since the Taliban returned to power in 2021. The regime is reshaping the country in its image while struggling to deal with mounting crises and the loss of western aid. The ABC's Meghna Bali travels across the country to uncover the reality of life in Afghanistan.",
  },
  {
    type: "movie",
    title: "Afganistan, un an sub talibani",
    cast: ["Adelin Petrisor"],
    cover: "covers/afghanistan_adelin_p.png",
    year: 2022,
    rating: "N/A",
    description:
      "Un reportaj de 20 de minute din Afganistanul condus de talibani. Echipa TVR a fost singura din România care a filmat în țară condusă de fundamentaliști. Un reportaj exclusiv și în premiera pentru România.",
  },
  {
    type: "movie",
    title: "Coreea de Nord, nimic de invidiat, un documentar de Adelin Petrișor",
    cast: ["Adelin Petrisor"],
    cover: "covers/coreea_de_nord_adelin.png",
    year: 2013,
    rating: "N/A",
    description:`
    „O ţară în care absolut tot ce faci este controlat, o ţară în care nu ai voie să te plimbi în capitală, trebuie să ceri aprobare ca să-ţi vizitezi rudele", povesteşte Adelin Petrişor despre experienţa sa în Coreea de Nord.
    `,
  },
  {
    type: "movie",
    title: "Coreea de Nord - când paranoia e la nivel de stat",
    cast: ["Zaiafet"],
    cover: "covers/coreea_de_nord_zaiafet.png",
    year: 2022,
    rating: "N/A",
    description:`
Frica și foamea țin și astăzi în viață cea mai cumplită societate din istoria omenirii, cel mai de nepătruns totalitarism și, cum bine zicea un jurnalist român, pe singurul gras dintr-o țară de slabi. Astăzi vorbim așadar despre Coreea de Nord, dictatura care face să pălească și cele mai negre distopii. Când, am citit, în liceu, romanul lui George Orwell, 1984, mi-am zis că ceva mai rău de-atât nu poate exista. Ei bine, Coreea de Nord se încăpățânează să bată ficțiunea: din 1948, familia conducătoare Kim și-a pus mintea, sufletul și toate meschinăriile condiției umane la contribuție pentru a crea un stat-închisoare în care mai puternice decât conducătorii supremi sunt doar frica și foamea. Este locul în care totul este atât de absurd, încât multe informații care vin din interior par greu de crezut. Și totuși, chiar se întâmplă, și o să vă spun astăzi cum ajunge un popor, prin frică și foame, să trăiască într-un univers aproape paralel și de neimaginat, în care fiecare se descurcă cum poate și, mai ales, supraviețuiește de la o zi la alta.
    `,
  },
];

const banking = [
  {
    type: "book",
    title:
      "Ghost Wars: The Secret History of the CIA, Afghanistan, and Bin Laden from the Soviet Invasion to September 10, 2001",
    author: "Steve Coll",
    cover: "covers/ghost_wars.jpeg",
    year: 2006,
    rating: "4.31 Goodreads",
    description: `
Povestește despre razboiul civil din Afganistan, creșterea puterii Al Qaeda, încercarea de a-l captura pe Bin Laden.
    `,
  },
  {
    type: "book",
    title: "Pe urmele lui Pablo Escobar",
    author: "Mark Browden",
    cover: "covers/pe_urmele_lui_pablo.jpeg",
    year: 2025,
    rating: "3.98 Goodreads",
    description: `
Biografia lui Pablo Escobar, liderul cartelului drogurilor din Columbia, care surprinde ascensiunea și decăderea acestuia.
    `,
  },
  {
    type: "book",
    title: "ZeroZeroZero",
    author: "Roberto Saviano",
    cover: "covers/zero.jpeg",
    year: 2025,
    rating: "3.75 Goodreads",
    description: `
Un tribut adus victimelor celor care și-au dedicat viața luptei contra crimei organizate. 
Este o investigație șocantă, documentată în profunzime, care explorează lanțul internațional al traficului de cocaină: de la plantațiile din America Latină, la rețelele de distribuție infiltrate în politică, finanțe și instituții ale statului din întreaga lume.
`,
  },
  {
    type: "book",
    title: "Coreea de Nord. Viața dincolo de clișee",
    author: "Daniel Tudor, James Pearson",
    cover: "covers/coreea_de_nord_viata.jpeg",
    year: 2022,
    rating: "3.64 Goodreads",
    description: `
În șapte capitole antrenante, autorii dezvăluie cum arată cu adevărat viața nord-coreenilor de rând. Ei se folosesc de nenumărate surse documentare - de la interviuri cu liderii elitei politice conducătoare de la Phenian la transfugi, de la diplomați la reprezentanți ai organizațiilor nonguvernamentale și comercianți transfrontalieri, precum și de la relatări în engleză, coreeană și chineză, făcând o sinteză extrem de complexă a societății nord-coreene de azi. 
    `,
  },
  {
    type: "book",
    title: "Țara cu un singur gras",
    author: "Adelin Petrisor",
    cover: "covers/tara_cu_un_singur_gras.jpeg",
    year: 2020,
    rating: "4.17 Goodreads",
    description: `
Despre Coreea de Nord și despre experiența lui Adelin Petrisor după o vizită de 7 zile acolo. 
    `,
  },
  {
    type: "book",
    title:
      "Dirty Dealing: The Untold Truth about Global Money Laundering, International Crime and Terrorism",
    author: "Peter Lilley",
    cover: "covers/dirty_dealing.jpeg",
    year: 2006,
    rating: "3.29 Goodreads",
    description: `
 Explorează industria globala a 3 trilioane de dolari a spălării banilor demonstrând cum 'curațarea' banilor murdari alimentează direct terorismul și crima organizată. 
 Autorul oferă studii de caz reale despre cum bancile și paradisurile fiscale sunt manipulate pentru a face profituri ilegale, invizibile în fața legii.
    `,
  },
  {
    type: "book",
    title: "Eu sint Malala",
    author: "Christina Lamb, Malala Yousafzai",
    cover: "covers/malala.jpeg",
    year: 2014,
    rating: "4.13 Goodreads",
    description: `
 O fata din Pakistan care a luptat pentru dreptul fetelor la educație și a supraviețuit unui atac al talibanilor.
    `,
  },
  {
    type: "book",
    title: "Vânătorii de zmeie",
    author: "Khaled Hosseini",
    cover: "covers/vanatorii_de_zmeie.jpeg",
    year: 2020,
    rating: "4.36 Goodreads",
    description: `
    În fundal se derulează evenimentele care au marcat istoria Afganistanului în ultimii treizeci de ani - ocupația sovietică, jihadul dus împotriva ei, războiul civil și teroarea instaurată de regimul taliban.
    `,
  },
  {
    type: "book",
    title: "Splendida cetate a celor o mie de sori",
    author: "Khaled Hosseini",
    cover: "covers/sori.jpeg",
    year: 2020,
    rating: "4.46 Goodreads",
    description: `
    În fundal se derulează evenimentele care au marcat istoria Afganistanului în ultimii treizeci de ani - ocupația sovietică, jihadul dus împotriva ei, războiul civil și teroarea instaurată de regimul taliban.
    `,
  },
  {
    type: "book",
    title: "Operațiunea Cezar",
    author: "Garance Le Caisne",
    cover: "covers/cezar.jpeg",
    year: 2017,
    rating: "3.94 Goodreads",
    description: `
Dovezi copleșitoare despre crime de război și crime împotriva umanității. De ce Siria este sancționată.
`,
  },
  {
    type: "book",
    title: "ISIS: negustorii de oameni",
    author: "Loretta Napoleoni",
    cover: "covers/ISIS.jpeg",
    year: 2016,
    rating: "3.92 Goodreads",
    description: `
Despre finanțarea terorismului, cum se obțin bani iliciți din răpirea turiștilor, a oamenilor din fundații umanitare, din droguri și imigrație.
`,
  },
];

const economie = [
  {
    type: "book",
    title: "Iran's USDT and Stablecoin-Based Sanctions Evasion: An Empirical Analysis of Digital Dollar Exploitation for International Trade Finance",
    author: "Osman Sonmez",
    cover: "covers/irans_usdt.png",
    year: 2025,
    trailer:"https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6362678",
    description: `
This study examines how Iran exploits USDT and stablecoin technology for sanctions evasion in international trade finance. It documents the mechanisms, estimates the scale, maps the geographic corridors, evaluates issuer compliance responses, and proposes a detection framework.
`,
  },
  {
    type: "book",
    title: "Incriminarea nerespectării sancțiunilor internaționale impuse de Uniunea Europeană – sancțiuni derogatorii de la Codul penal pentru persoane juridice",
    author: "Laura LICĂ-BANU, Cătălin CHIBZUI",
    cover: "covers/juridice_fs.png",
    year: 2026,
    trailer:"https://www.juridice.ro/813290",
    description: `
Consecințele eludării sancțiunilor financiare în România, cu trimitere la Legea nr. 224 din 12 decembrie 2025.
`,
  },
  {
    type: "book",
    title: "International sanctions evasion: Four tactics to track",
    author: "Zhanna Kondzirska, Kirsti-Leigh Styer",
    cover: "covers/lseg.png",
    year: 2025,
    trailer:"https://www.lseg.com/en/insights/risk-intelligence/international-sanctions-evasion-four-tactics-to-track",
    description: `
Câteva tehnici frecvente de eludare a sancțiunilor financiare.
`,
  },
  {
    type: "book",
    title: "IFIC (Iranian Foreign Investment Company)",
    author: "Zhanna Kondzirska, Kirsti-Leigh Styer",
    cover: "covers/ifmat.png",
    year: 2026,
    trailer:"https://www.ifmat.org/iran-foreign-investment-company-ific-report-2/",
    description: `
Iranian Regime: Frauds, Manipulations, Atrocities, Human Rights Violations, Threats, Crimes, News.
`,
  },
];

// =====================
// RENDER FUNCTION
// =====================
function renderCarousel(items, trackId) {
  const track = document.getElementById(trackId);

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${item.cover}" alt="${item.title}">
    `;

    card.addEventListener("click", () => {
      openModal(item);
    });

    track.appendChild(card);
  });
}

// =====================
// INIT
// =====================
renderCarousel(filme, "filme-track");
renderCarousel(banking, "banking-track");
renderCarousel(economie, "economie-track");

// =====================
// CAROUSEL 
// =====================
document.querySelectorAll(".carousel-wrapper").forEach((carousel) => {
  const track = carousel.querySelector(".carousel-track");
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");

  let currentIndex = 0;
  const visibleCards = 5;

  function getCards() {
    return carousel.querySelectorAll(".card");
  }

  function updateCarousel() {
    const cards = getCards();
    if (!cards.length) return;

    const cardWidth = cards[0].offsetWidth + 20;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= cards.length - visibleCards;
  }

  nextBtn.addEventListener("click", () => {
    const cards = getCards();
    if (currentIndex < cards.length - visibleCards) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  requestAnimationFrame(updateCarousel);
});


// =====================
// MODAL
// =====================
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
// const modalMeta = document.getElementById("modalMeta");
const modalExtra = document.getElementById("modalExtra");
const modalDescription = document.getElementById("modalDescription");
const modalTrailer = document.getElementById("modalTrailer");

function openModal(item) {
  modalImage.src = item.cover;
  modalTitle.textContent = item.title;
  // modalMeta.textContent = `${item.year} • ${item.rating}`;
  modalDescription.textContent = item.description;

  // RESET extra field
  modalExtra.textContent = "";
  modalExtra.style.display = "none";

  // BOOK → AUTHOR
  if (item.author) {
    modalExtra.innerHTML = `<strong>Author:</strong> ${item.author}`;
    modalExtra.style.display = "block";
  }

  // MOVIE → CAST
  if (item.cast) {
    modalExtra.innerHTML = `<strong>Cast:</strong> ${item.cast.join(", ")}`;
    modalExtra.style.display = "block";
  }

  if (item.trailer) {
    modalTrailer.href = item.trailer;
    modalTrailer.style.display = "inline-block";
  } else {
    modalTrailer.style.display = "none";
  }
  modalOverlay.classList.add("active");
}

function closeModal() {
  modalOverlay.classList.remove("active");
}
modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
