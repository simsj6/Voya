function PrivacyPage() {
  return (
    <section className="form-page form-page-profile">
      <div className="content-panel">
        <div className="page-heading">
          <span className="eyebrow">Privacy Policy</span>
          <h1>Your Travel Planning Data, Explained Clearly</h1>
          <p>
            This page outlines the kind of information a planning experience like
            VOYA may use, why it matters, and how that information supports a
            smoother trip-building flow.
          </p>
        </div>

        <div className="faq-list">
          <article className="faq-card">
            <h2>Information You Share</h2>
            <p>
              Planning details such as destination preferences, date ranges,
              traveler counts, and profile information help shape itinerary
              suggestions and route organization inside the app.
            </p>
          </article>

          <article className="faq-card">
            <h2>How It Is Used</h2>
            <p>
              That information is used to personalize recommendations, maintain trip
              drafts, and make related pages like maps, activities, and profiles
              feel connected and useful.
            </p>
          </article>

          <article className="faq-card">
            <h2>Communication</h2>
            <p>
              If you contact VOYA directly, your message details may be used to
              respond to support requests, answer planning questions, and improve
              the clarity of the overall experience.
            </p>
          </article>

          <article className="faq-card">
            <h2>Your Control</h2>
            <p>
              You should be able to review, update, or remove planning details as
              your trip evolves. Clear settings, editable forms, and transparent
              account pages are part of that principle.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default PrivacyPage
