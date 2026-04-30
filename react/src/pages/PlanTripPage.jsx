import { useState } from 'react'
import {
  filters,
  plannerDateRanges,
  plannerDestinations,
  plannerTravelerCounts,
} from '../data/siteContent'

function PlanTripPage() {
  const [selectedFilter, setSelectedFilter] = useState('Balanced')

  return (
    <section className="hero-section page-section-spacious">
      <div className="hero-copy">
        <h1>Plan A Trip</h1>
        <p>
          Shape the outline of your next getaway, then move into the full trip
          builder when you&apos;re ready to lock in the details.
        </p>
      </div>

      <section className="planner-card planner-card-large" aria-label="Trip planner">
        <div className="planner-grid">
          <label className="field">
            <span>Destination</span>
            <select defaultValue="Kyoto, Japan">
              {plannerDestinations.map((destination) => (
                <option key={destination} value={destination}>
                  {destination}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Dates</span>
            <select defaultValue="October 12 - October 22">
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

          <a className="planner-button" href="#add-trip">
            Continue Planning
          </a>
        </div>

        <div className="plan-trip-columns">
          <div className="plan-trip-card">
            <h2>Recommended Pace</h2>
            <div className="chip-list">
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

          <div className="plan-trip-card">
            <h2>What Matters Most</h2>
            <ul className="bullet-list">
              <li>Cultural experiences and local cuisine</li>
              <li>Hotel stays with warm, modern design</li>
              <li>Flexible days for rest and wandering</li>
            </ul>
          </div>
        </div>
      </section>
    </section>
  )
}

export default PlanTripPage
