import { activities } from '../data/siteContent'

function ActivityPage() {
  return (
    <section className="form-page form-page-profile">
      <div className="content-panel">
        <div className="page-heading">
          <h1>Activity</h1>
          <p>
            Review standout moments for your next itinerary and choose what belongs
            on the final route.
          </p>
        </div>

        <div className="activity-layout">
          <section className="activity-hero">
            <div className="activity-hero-copy">
              <span className="eyebrow">Featured Experience</span>
              <h2>Alaska Winter Adventure</h2>
              <p>
                A layered itinerary with glacier walks, lodge evenings, and scenic
                train connections built for travelers who want both wonder and rest.
              </p>
              <a className="planner-button" href="#add-trip">
                Add To Trip
              </a>
            </div>
          </section>

          <section className="activity-list">
            {activities.map((item) => (
              <article key={item.title} className="activity-card">
                <div>
                  <span className="eyebrow">{item.meta}</span>
                  <h3>{item.title}</h3>
                  <p>{item.blurb}</p>
                </div>
                <button className="chip chip-active" type="button">
                  Select
                </button>
              </article>
            ))}
          </section>
        </div>
      </div>
    </section>
  )
}

export default ActivityPage
