import { destinationCards } from '../data/siteContent'

function PopularDestinationsPage() {
  return (
    <section className="form-page form-page-profile">
      <div className="content-panel">
        <div className="page-heading">
          <h1>Popular Destinations</h1>
          <p>
            Explore curated places that pair beautifully with the way you like to
            travel.
          </p>
        </div>

        <div className="destination-grid">
          {destinationCards.map((card) => (
            <article key={card.title} className={card.className}>
              <div className="destination-overlay" />
              <div className="destination-copy">
                <h2>{card.title}</h2>
                <p>{card.subtitle}</p>
                <a className="destination-link" href="#plan-a-trip">
                  Build This Trip
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PopularDestinationsPage
