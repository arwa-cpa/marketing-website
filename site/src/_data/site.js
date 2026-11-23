// Site-wide links and settings, used by the header, footer and page sections.
// No email address is shown on the site by choice; the phone number and the
// contact form are the way in.
export default {
  // Google Voice business number: calls ring Arwa's phone, and texts are
  // answered in the Google Voice app or at voice.google.com.
  // phone is shown on the page; phoneLink is used in tel:/sms: links.
  phone: "(248) 537-2210",
  phoneLink: "+12485372210",

  // Timely notes that scroll in the top bar (beside the phone number on
  // desktop, on their own below 1040px). main.js shows the one whose
  // from–to range (month-day, inclusive) holds today's date, so they
  // change on their own without a rebuild.
  // Keep the ranges covering the whole year without overlapping.
  seasonalMessages: [
    { from: "01-01", to: "04-15", text: "Tax season is open: U.S. returns are due April 15 and Canadian returns April 30. Book early to get a spot." },
    { from: "04-16", to: "06-15", text: "Americans living in Canada: your U.S. return is due June 15, the same day as Canadian self-employed returns." },
    { from: "06-16", to: "10-15", text: "On a U.S. extension? Extended returns and FBARs are due October 15." },
    { from: "10-16", to: "12-31", text: "Year-end planning: most moves that lower this year's taxes have to happen by December 31." },
  ],

  // A Google Group on the Workspace account, for privacy requests. Shown on
  // the privacy page only: the one exception to showing no email address.
  privacyEmail: "privacy@arburcpa.com",

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
