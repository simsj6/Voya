import { useState } from 'react'
import {
  destinationHighlights,
  filters,
  plannerDateRanges,
  plannerDestinations,
  plannerTravelerCounts,
  planningSteps,
  testimonials,
  trips,
} from '../data/siteContent'

function HomePage() {
  const [selectedFilter, setSelectedFilter] = useState('Balanced')

  return (
    <>
      <section className="hero-section" id="hero">
        <div className="hero-copy">
          <h1>Plan Your Next Adventure</h1>
          <p>
            Design a journey that reflects your pace. Tell us your desires, and
            we&apos;ll craft the perfect escape.
          </p>
        </div>

        <section className="planner-card" aria-label="Trip planner">
          <div className="planner-grid">
            <label className="field">
              <span>Destination</span>
              <select defaultValue="">
                <option value="" disabled>
                  Choose destination
                </option>
                {plannerDestinations.map((destination) => (
                  <option key={destination} value={destination}>
                    {destination}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Dates</span>
              <select defaultValue="">
                <option value="" disabled>
                  Select date range
                </option>
                {plannerDateRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Travelers</span>
              <select defaultValue="2 Adults">
                {plannerTravelerCounts.map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </label>

            <button className="planner-button" type="button">
              Find Your Next Adventure
            </button>
          </div>

          <div className="filter-row">
            <span className="filter-label">Pace &amp; Budget:</span>
            <div className="chip-list" role="list" aria-label="Travel styles">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`chip ${selectedFilter === filter ? 'chip-active' : ''}`}
                  type="button"
                  onClick={() => setSelectedFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>
      </section>

      <section className="itineraries-section" aria-labelledby="itineraries-title">
        <div className="section-heading">
          <h2 id="itineraries-title">Suggested Itineraries</h2>
          <a href="#home">View All</a>
        </div>

        <div className="trip-grid">
          {trips.map((trip) => (
            <article key={trip.title} className={trip.className}>
              <div className="trip-overlay" />
              <div className="trip-meta">
                <div className="trip-tags">
                  <span>{trip.days}</span>
                  <span>{trip.tag}</span>
                </div>
                <h3>{trip.title}</h3>
                <p>{trip.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-content-section">
        <div className="section-heading section-heading-stack">
          <div>
            <h2>Travel Designed Around You</h2>
            <p className="section-intro">
              Every itinerary begins with mood, rhythm, and the kind of moments you
              want to remember long after you&apos;re home.
            </p>
          </div>
        </div>

        <div className="highlight-grid">
          {destinationHighlights.map((item) => (
            <article key={item.title} className="highlight-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-content-section process-section">
        <div className="split-section">
          <div className="split-copy">
            <span className="eyebrow">Our Process</span>
            <h2>Planning Should Feel Like Part Of The Adventure</h2>
            <p>
              We combine elegant structure with enough flexibility to let the trip
              evolve naturally as you discover what you want most.
            </p>
            <a className="planner-button" href="#plan-a-trip">
              Start Planning
            </a>
          </div>

          <div className="step-list">
            {planningSteps.map((step) => (
              <article key={step.number} className="step-card">
                <span className="step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-content-section">
        <div className="section-heading section-heading-stack">
          <div>
            <h2>Traveler Notes</h2>
            <p className="section-intro">
              A few reflections from people who wanted travel to feel personal, calm,
              and beautifully organized.
            </p>
          </div>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article key={item.name} className="testimonial-card">
              <p className="testimonial-quote">“{item.quote}”</p>
              <div className="testimonial-meta">
                <strong>{item.name}</strong>
                <span>{item.trip}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-content-section">
        <div className="cta-banner">
          <div>
            <span className="eyebrow">Ready When You Are</span>
            <h2>Build A Trip That Feels Effortless From The Start</h2>
          </div>
          <a className="planner-button" href="#signup">
            Create Your Account
          </a>
        </div>
      </section>
    </>
  )
}

export default HomePage
