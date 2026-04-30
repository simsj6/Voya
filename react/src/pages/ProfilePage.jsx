import { profileTrips } from '../data/siteContent'

function ProfilePage() {
  return (
    <section className="form-page form-page-profile">
      <div className="form-panel profile-panel">
        <div className="profile-header">
          <div className="profile-avatar">LT</div>
          <div>
            <h1>User Profile</h1>
            <p className="profile-subtitle">Manage your details and saved journeys.</p>
          </div>
        </div>

        <div className="profile-grid">
          <section className="profile-card">
            <h2>Account Details</h2>
            <div className="stacked-form">
              <label className="field">
                <span className="form-label">Full Name</span>
                <input type="text" defaultValue="Logan Traveler" />
              </label>
              <label className="field">
                <span className="form-label">Email</span>
                <input type="email" defaultValue="FakeEmail@Gmail.com" />
              </label>
              <label className="field">
                <span className="form-label">Preferred Travel Style</span>
                <input type="text" defaultValue="Balanced luxury, cultural trips" />
              </label>
            </div>
          </section>

          <section className="profile-card">
            <h2>Upcoming Trips</h2>
            <div className="profile-trip-list">
              {profileTrips.map((trip) => (
                <article key={trip.destination} className="profile-trip-item">
                  <div>
                    <h3>{trip.destination}</h3>
                    <p>{trip.dates}</p>
                  </div>
                  <span className="profile-status">{trip.status}</span>
                </article>
              ))}
            </div>
          </section>

          <section className="profile-card profile-card-wide">
            <h2>Travel Preferences</h2>
            <div className="chip-list">
              <button className="chip chip-active" type="button">
                Scenic routes
              </button>
              <button className="chip" type="button">
                Boutique hotels
              </button>
              <button className="chip" type="button">
                Culinary stops
              </button>
              <button className="chip" type="button">
                Guided experiences
              </button>
            </div>
          </section>
        </div>

        <div className="form-actions">
          <button className="planner-button auth-submit" type="button">
            Save Profile
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
