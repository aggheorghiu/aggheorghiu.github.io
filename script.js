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
  "Micro-dictionarr de corporateza",
  "bla bla bla bla x1"
]

let currentIndex = 0;
const labelElement = document.getElementById("heroLabel");

function updateLabel() {
  labelElement.textContent = labels[currentIndex];
  currentIndex = (currentIndex + 1) % labels.length;
}

updateLabel();
setInterval(updateLabel, 5000);