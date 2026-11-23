document.getElementById('year').textContent = new Date().getFullYear();

// Show the top bar's seasonal message for today's date ("MM-DD" ranges)
const today = new Date();
const monthDay = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
document.querySelectorAll('.top-bar .season').forEach((msg) => {
  msg.hidden = !(msg.dataset.from <= monthDay && monthDay <= msg.dataset.to);
});

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

// Contact form submission via Formspree (fetch keeps the user on-page).
// The form is only on the home page.
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form?.addEventListener('submit', async (event) => {
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
