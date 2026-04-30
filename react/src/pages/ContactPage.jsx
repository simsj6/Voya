function ContactPage() {
  return (
    <section className="form-page form-page-profile">
      <div className="content-panel">
        <div className="page-heading">
          <span className="eyebrow">Contact Us</span>
          <h1>We’d Love To Hear About Your Next Trip</h1>
          <p>
            Reach out with planning questions, feedback, or ideas for where Voya
            should go next. We’ll keep the conversation warm, clear, and helpful.
          </p>
        </div>

        <div className="about-hero-grid">
          <section className="about-story-card">
            <h2>Send A Note</h2>
            <div className="stacked-form contact-form">
              <label className="field">
                <span className="form-label">Full Name</span>
                <input type="text" placeholder="Your name" />
              </label>
              <label className="field">
                <span className="form-label">Email</span>
                <input type="email" placeholder="you@example.com" />
              </label>
              <label className="field">
                <span className="form-label">Message</span>
                <textarea placeholder="Tell us what you need help with" rows="6" />
              </label>
              <button className="planner-button contact-submit" type="button">
                Send Message
              </button>
            </div>
          </section>

          <section className="about-stat-panel">
            <article className="about-stat-card">
              <strong>Email</strong>
              <span>hello@voya.travel</span>
            </article>
            <article className="about-stat-card">
              <strong>Hours</strong>
              <span>Monday to Friday, 9 AM to 5 PM Pacific Time</span>
            </article>
            <article className="about-stat-card">
              <strong>Response Time</strong>
              <span>Most questions receive a reply within one business day.</span>
            </article>
          </section>
        </div>
      </div>
    </section>
  )
}

export default ContactPage
