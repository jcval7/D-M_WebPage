let slideIndex = 1;
let slideTimer;

// Iniciar carrusel
showSlides(slideIndex);
autoSlides();

function moveSlide(n) {
  showSlides((slideIndex += n));
  resetTimer();
}

function currentSlide(n) {
  showSlides((slideIndex = n));
  resetTimer();
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");
}

function autoSlides() {
  slideTimer = setInterval(() => {
    moveSlide(1);
  }, 5000); // Cambio cada 5 segundos
}

function resetTimer() {
  clearInterval(slideTimer);
  autoSlides();
}

// ----------------- Traductor icono -------------------------------------//

function cambiarIdioma(lang) {
  // Buscamos el selector interno que crea Google
  const googleCombo = document.querySelector(".goog-te-combo");

  if (googleCombo) {
    googleCombo.value = lang;
    // Disparamos los eventos que Google escucha obligatoriamente para traducir
    googleCombo.dispatchEvent(new Event("change", { bubbles: true }));
    googleCombo.dispatchEvent(new Event("input", { bubbles: true }));
    console.log("Traducción enviada a: " + lang);
  } else {
    console.error("El motor de Google aún no está listo.");
  }
}

function gestionarTraductor() {
  const langCircle = document.getElementById("lang-switcher");
  const flagImg = document.getElementById("flag-icon");

  if (langCircle && flagImg) {
    langCircle.onclick = function (e) {
      e.preventDefault();

      // Si la bandera actual es GB (Gran Bretaña), traducimos a Inglés
      if (flagImg.src.includes("gb.png")) {
        cambiarIdioma("en");
        flagImg.src = "https://flagcdn.com/w80/co.png"; // Cambia a bandera de Colombia
        flagImg.alt = "Cambiar a Español";
      } else {
        // Si no, volvemos a Español
        cambiarIdioma("es");
        flagImg.src = "https://flagcdn.com/w80/gb.png"; // Cambia a bandera de GB
        flagImg.alt = "Translate to English";
      }
    };
  } else {
    // Si el botón no existe en el DOM, reintentamos en medio segundo
    setTimeout(gestionarTraductor, 500);
  }
}

// Iniciar la lógica cuando la página cargue
window.addEventListener("load", gestionarTraductor);

// ---------------- Carrusel Empresas que confiaron ---------------------//
document.addEventListener("DOMContentLoaded", function () {
  function shuffleAndFillMarquee(containerId) {
    const marquee = document.getElementById(containerId);
    if (!marquee) return;

    // 1. Obtener los logos originales escritos en el HTML
    let logos = Array.from(marquee.children);

    // 2. Mezclar el orden para que siempre sea distinto (Fisher-Yates)
    for (let i = logos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [logos[i], logos[j]] = [logos[j], logos[i]];
    }

    // 3. Limpiar el contenedor y poner los logos mezclados
    marquee.innerHTML = "";
    logos.forEach((logo) => marquee.appendChild(logo));

    // 4. TRUCO FINAL: Triplicar el contenido
    // Al triplicar, garantizamos que siempre haya logos visibles por la derecha
    const content = marquee.innerHTML;
    marquee.innerHTML = content + content + content;
  }

  // Llamamos a la función con el ID de tu contenedor
  shuffleAndFillMarquee("marquee-content");
});

//------------ FORMULARIO CONTACTANOS ----------------------//
const form = document.getElementById("contactForm");
const responseMessage = document.getElementById("responseMessage");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(form);

  fetch(form.action, {
    method: form.method,
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        // ÉXITO
        responseMessage.textContent =
          "¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.";
        responseMessage.style.color = "green";
        responseMessage.style.display = "block";
        responseMessage.style.opacity = "1"; // Asegurar visibilidad
        form.reset();

        // LOGICA PARA QUE DESAPAREZCA
        setTimeout(() => {
          responseMessage.style.transition = "opacity 1s ease";
          responseMessage.style.opacity = "0";
          setTimeout(() => {
            responseMessage.style.display = "none";
          }, 1000); // Espera a que termine la animación
        }, 5000); // 5 segundos visible
      } else {
        // ERROR
        responseMessage.textContent =
          "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.";
        responseMessage.style.color = "red";
        responseMessage.style.display = "block";
        responseMessage.style.opacity = "1";
      }
    })
    .catch((error) => {
      responseMessage.textContent =
        "Hubo un error de conexión. Intenta de nuevo más tarde.";
      responseMessage.style.color = "red";
      responseMessage.style.display = "block";
      responseMessage.style.opacity = "1";
    });
});

// ---------------------- Footer ------------------------ //
// Función para los modales - Asegura que funcione en todas las páginas
const iniciarModales = () => {
  const btnData = document.getElementById("openDataPolicy");
  const btnPrivacy = document.getElementById("openPrivacyNotice");
  const modalData = document.getElementById("modalDataPolicy");
  const modalPrivacy = document.getElementById("modalPrivacyNotice");
  const closeData = document.getElementById("closeData");
  const closePrivacy = document.getElementById("closePrivacy");

  if (btnData && modalData && closeData) {
    btnData.onclick = (e) => {
      e.preventDefault();
      modalData.style.display = "flex"; // Cambiado de 'block' a 'flex' para centrado CSS
      modalData.scrollTop = 0; // Asegura que inicie desde arriba
    };
    closeData.onclick = () => {
      modalData.style.display = "none";
    };
  }

  if (btnPrivacy && modalPrivacy && closePrivacy) {
    btnPrivacy.onclick = (e) => {
      e.preventDefault();
      modalPrivacy.style.display = "flex"; // Cambiado de 'block' a 'flex'
      modalPrivacy.scrollTop = 0; // Asegura que inicie desde arriba
    };
    closePrivacy.onclick = () => {
      modalPrivacy.style.display = "none";
    };
  }

  window.onclick = (event) => {
    if (event.target == modalData) modalData.style.display = "none";
    if (event.target == modalPrivacy) modalPrivacy.style.display = "none";
  };
};

// Se ejecuta apenas carga la página
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarModales);
} else {
  iniciarModales();
}
