// Site-wide links and settings, used by the header, footer and page sections.
// No email address is shown on the site by choice; the phone number and the
// contact form are the way in.
export default {
  // Google Voice business number: calls ring Arwa's phone, and texts are
  // answered in the Google Voice app or at voice.google.com.
  // phone is shown on the page; phoneLink is used in tel:/sms: links.
  phone: "(248) 537-2210",
  phoneLink: "+12485372210",

  // Arwa's personal LinkedIn profile
  linkedinUrl: "https://www.linkedin.com/in/anaalwala",

  googleProfileUrl: "https://maps.app.goo.gl/wBYL2nPMFZ6Q5nUa6",

  // Update by hand as new Google reviews come in.
  googleRatingText: "5.0 stars from 11 Google reviews",

  // Google Calendar appointment schedule, embedded in the booking section.
  // From Google Calendar: open the schedule → Share → Website embed → copy
  // the iframe's src (…/calendar/appointments/schedules/…?gv=true).
  bookingEmbedUrl: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0YnNj6YJYjuxmnCaKkBKhJisu3PRJTg2zNNxJzp5hKRZ4CzJL2lmkUoEvYRYX_c9JzeSu9kfJj?gv=true",

  // Formspree form ID (the part after /f/ in the endpoint), for the contact
  // form under the booking calendar, for people not ready to book
  formspreeId: "xrppvrva",
};
