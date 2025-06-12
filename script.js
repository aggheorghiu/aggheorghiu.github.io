document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  window.addEventListener('scroll', () => {
    let currentSectionId = "";
    document.querySelectorAll('.letter-section').forEach(section => {
      const sectionTop = section.offsetTop - 120; // offset for navbar
      if (pageYOffset >= sectionTop) {
        currentSectionId = section.id;
      }
    });

    document.querySelectorAll('.navbar a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

// label carousel
const labels = [
  "Micro-dictionar de corporateza",
  "Te-ai pierdut printre JOI, QBR si ASAP? \nAm fost si noi acolo. Am creat acest mini ghid ca sa iti fie mai usor sa navighezi prin limbajul corporatist fara sa intrebi colegii din jur de 10 ori pe zi."
]

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
setInterval(updateLabel, 5000);

// Auto-arrange
function sortDictionarySections() {
  document.querySelectorAll(".letter-section").forEach(section => {
    const terms = Array.from(section.querySelectorAll("div:not(h2)"));

    terms.sort((a,b) => {
      const aText = a.querySelector("strong")?.textContent?.trim() || '';
      const bText = b.querySelector("strong")?.textContent?.trim() || '';
      return aText.localeCompare(bText);
    });

    terms.forEach(term => section.removeChild(term));
    terms.forEach(term => section.appendChild(term));
  });
}

window.addEventListener("DOMContentLoaded", sortDictionarySections);