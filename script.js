(() => {
  const form = document.getElementById("booking-form");
  const status = document.getElementById("form-status");
  const arrival = document.getElementById("checkin");
  const departure = document.getElementById("checkout");
  const phone = form.elements.namedItem("phone");
  const year = document.getElementById("current-year");

  const localDate = (date) => {
    const yearPart = date.getFullYear();
    const monthPart = String(date.getMonth() + 1).padStart(2, "0");
    const dayPart = String(date.getDate()).padStart(2, "0");
    return `${yearPart}-${monthPart}-${dayPart}`;
  };

  const addDays = (isoDate, amount) => {
    const date = new Date(`${isoDate}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() + amount);
    return date.toISOString().slice(0, 10);
  };

  const today = localDate(new Date());
  arrival.min = today;
  departure.min = addDays(today, 2);
  year.textContent = String(new Date().getFullYear());

  arrival.addEventListener("change", () => {
    departure.min = addDays(arrival.value || localDate(new Date()), 2);
    if (departure.value && departure.value < departure.min) {
      departure.value = "";
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "";
    if (!form.reportValidity()) return;

    // Évite qu'un numéro composé uniquement d'espaces soit considéré comme valide.
    const phoneValue = phone.value.trim();
    if (phoneValue.replace(/\D/g, "").length < 8) {
      phone.setCustomValidity("Veuillez indiquer un numéro de téléphone valide (au moins 8 chiffres).");
      phone.reportValidity();
      phone.setCustomValidity("");
      return;
    }

    if (arrival.value < localDate(new Date())) {
      status.textContent = "La date d’arrivée ne peut pas être dans le passé.";
      arrival.focus();
      return;
    }

    if (!arrival.value || !departure.value || departure.value < addDays(arrival.value, 2)) {
      status.textContent = "Un séjour de 2 nuits minimum est obligatoire. Choisissez une date de départ au moins 2 jours après l’arrivée.";
      departure.focus();
      return;
    }

    const recipient = String(window.SITE_CONFIG?.contactEmail || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient) || /[\r\n]/.test(recipient)) {
      status.textContent = "L’adresse e-mail du propriétaire n’est pas configurée. Aucune donnée n’a été envoyée.";
      return;
    }

    const data = new FormData(form);
    const subject = "Demande de réservation — L’Oasis de Volny";
    const body = [
      `Nom : ${data.get("name")}`,
      `E-mail : ${data.get("email")}`,
      `Téléphone : ${phoneValue}`,
      `Arrivée souhaitée : ${data.get("checkin")}`,
      `Départ souhaité : ${data.get("checkout")}`,
      `Nombre de nuits : ${Math.round((Date.parse(departure.value + "T00:00:00Z") - Date.parse(arrival.value + "T00:00:00Z")) / 86400000)}`,
      `Nombre de voyageurs : ${data.get("guests")}`,
      "",
      `Message : ${data.get("message") || "Aucun"}`
    ].join("\n");

    status.textContent = "Votre application e-mail va s’ouvrir. Vérifiez la demande avant de l’envoyer.";
    window.location.href = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
