document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }

  const form = document.querySelector("[data-contact-form]");
  if (form) {
    const status = form.querySelector("[data-form-status]");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const endpoint = form.getAttribute("action");
      if (!endpoint || endpoint.includes("YOUR_FORM_ID")) {
        status.className = "form-status err";
        status.textContent =
          "Form not connected yet. Please add your Formspree endpoint in the form's action attribute.";
        return;
      }
      const data = new FormData(form);
      status.className = "form-status";
      status.textContent = "";
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          status.className = "form-status ok";
          status.textContent = "Thanks! Your message has been sent. We'll be in touch soon.";
          form.reset();
        } else {
          status.className = "form-status err";
          status.textContent = "Something went wrong. Please try again or call us directly.";
        }
      } catch (err) {
        status.className = "form-status err";
        status.textContent = "Network error. Please try again or call us directly.";
      }
    });
  }
});
