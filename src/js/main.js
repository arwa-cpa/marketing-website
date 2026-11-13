document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Header call icon (narrow screens): opens a Call / Text menu.
// Any click elsewhere, or choosing an option, closes it.
const phoneToggle = document.getElementById('phone-toggle');
const phoneOptions = document.getElementById('phone-options');

function setPhoneMenu(open) {
  phoneOptions.classList.toggle('is-open', open);
  phoneToggle.setAttribute('aria-expanded', String(open));
}

phoneToggle.addEventListener('click', (event) => {
  event.stopPropagation();
  setPhoneMenu(!phoneOptions.classList.contains('is-open'));
});
document.addEventListener('click', () => setPhoneMenu(false));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setPhoneMenu(false);
});

// Contact form submission via Formspree (fetch keeps the user on-page)
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  status.textContent = 'Sending...';
  status.className = 'form-status';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });

    if (response.ok) {
      status.textContent = "Thanks — we'll be in touch soon.";
      status.className = 'form-status success';
      form.reset();
    } else {
      status.textContent = 'Something went wrong. Please try again in a moment.';
      status.className = 'form-status error';
    }
  } catch (err) {
    status.textContent = 'Something went wrong. Please try again in a moment.';
    status.className = 'form-status error';
  }
});
