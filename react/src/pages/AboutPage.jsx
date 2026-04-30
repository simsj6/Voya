import { aboutStats, aboutValues, teamNotes } from '../data/siteContent'

function AboutPage() {
  return (
    <section className="form-page form-page-profile">
      <div className="content-panel">
        <div className="page-heading">
          <span className="eyebrow">About Voya</span>
          <h1>Travel Planning With Warmth, Taste, And Intention</h1>
          <p>
            Voya was created for travelers who want more than a checklist. We
            design trips that feel grounded in your preferences, elegant in their
            logistics, and rich with memorable details.
          </p>
        </div>

        <div className="about-hero-grid">
          <section className="about-story-card">
            <h2>Why We Build This Way</h2>
            <p>
              We believe thoughtful travel begins long before departure. A strong
              itinerary balances beauty with practicality: the right pacing, the
              right transitions, and enough breathing room for a place to surprise
              you.
            </p>
            <p>
              That philosophy shapes every part of Voya. We want planning to feel
              calm and inspiring, not overwhelming. The result is a system that
              helps you compare ideas, refine details, and move forward with
              confidence.
            </p>
          </section>

          <section className="about-stat-panel">
            {aboutStats.map((stat) => (
              <article key={stat.label} className="about-stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </section>
        </div>

        <section className="home-content-section about-section-reset">
          <div className="section-heading section-heading-stack">
            <div>
              <h2>What Guides Us</h2>
              <p className="section-intro">
                The VOYA experience is built around a few simple ideas that keep
                the product consistent from inspiration to final itinerary.
              </p>
            </div>
          </div>

          <div className="highlight-grid">
            {aboutValues.map((value) => (
              <article key={value.title} className="highlight-card">
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="split-section about-team-section">
          <div className="split-copy">
            <span className="eyebrow">How We Think</span>
            <h2>A Small Team With A Detailed Eye</h2>
            <p>
              We care about sequencing, atmosphere, and the tiny moments that make
              an itinerary feel personal. That means fewer generic suggestions and
              more deliberate choices about where to go, when to pause, and what to
              prioritize.
            </p>
            <a className="planner-button" href="#plan-a-trip">
              Plan With Voya
            </a>
          </div>

          <div className="step-list">
            {teamNotes.map((item) => (
              <article key={item.title} className="step-card">
                <span className="eyebrow">{item.role}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}

export default AboutPage
