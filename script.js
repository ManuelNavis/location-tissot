(() => {
  const form = document.getElementById("booking-form");
  const status = document.getElementById("form-status");
  const arrival = document.getElementById("checkin");
  const departure = document.getElementById("checkout");
  const year = document.getElementById("current-year");

  const localDate = (date) => {
    const yearPart = date.getFullYear();
    const monthPart = String(date.getMonth() + 1).padStart(2, "0");
    const dayPart = String(date.getDate()).padStart(2, "0");
    return `${yearPart}-${monthPart}-${dayPart}`;
  };

  arrival.min = localDate(new Date());
  departure.min = arrival.min;
  year.textContent = String(new Date().getFullYear());

  arrival.addEventListener("change", () => {
    departure.min = arrival.value || localDate(new Date());
    if (departure.value && departure.value <= arrival.value) {
      departure.value = "";
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "";

    if (!form.reportValidity()) return;
    if (departure.value <= arrival.value) {
      status.textContent = "La date de départ doit être postérieure à la date d’arrivée.";
      departure.focus();
      return;
    }

    const recipient = String(window.SITE_CONFIG?.contactEmail || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient) || /[\r\n]/.test(recipient)) {
      status.textContent = "Le propriétaire doit d’abord renseigner son adresse e-mail dans le fichier config.js. Aucune donnée n’a été envoyée.";
      return;
    }

    const data = new FormData(form);
    const subject = "Demande de réservation — logement TISSOT";
    const body = [
      `Nom : ${data.get("name")}`,
      `E-mail : ${data.get("email")}`,
      `Téléphone : ${data.get("phone") || "Non renseigné"}`,
      `Arrivée souhaitée : ${data.get("checkin")}`,
      `Départ souhaité : ${data.get("checkout")}`,
      `Nombre de voyageurs : ${data.get("guests")}`,
      "",
      `Message : ${data.get("message") || "Aucun"}`
    ].join("\n");

    status.textContent = "Votre application e-mail va s’ouvrir. Vérifiez la demande avant de l’envoyer.";
    window.location.href = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
