import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const assets = {
  beach: "/assets/voya-beach.png",
  alaska: "/assets/voya-alaska.jpg",
  aurora: "/assets/voya-aurora.jpg",
  lake: "/assets/voya-lake.jpg",
  trees: "/assets/voya-trees.jpg",
  alaskaView: "/assets/voya-alaska-view.png",
  activity1: "/assets/voya-activity1.png",
  activity2: "/assets/voya-activity2.png",
  activity3: "/assets/voya-activity3.png",
  activity4: "/assets/voya-activity4.png",
  map: "/assets/voya-map.png",
  villa: "/assets/voya-villa.jpg",
  amalfi: "/assets/voya-amalfi.png",
  kyoto: "/assets/voya-kyoto.png",
  river: "/assets/voya-river.png",
  tower: "/assets/voya-tower.png",
  market: "/assets/voya-market.png",
  coast: "/assets/voya-coast.png",
  stonehenge: "/assets/voya-stonehenge.png",
  oxford: "/assets/voya-oxford.png",
  mountainView: "/assets/voya-mountain-view.jpg",
  gallery1: "/assets/voya-gallery1.jpg",
  gallery2: "/assets/voya-gallery2.jpg",
  gallery3: "/assets/voya-gallery3.jpg",
  gallery4: "/assets/voya-gallery4.jpg",
  basemap: "/assets/voya-basemap.png",
  profile: "/assets/voya-profile.jpg",
};

const navItems = [
  { key: "home", label: "Home" },
  { key: "destinations", label: "Popular Destinations" },
  { key: "plan", label: "Plan A Trip" },
  { key: "map", label: "Map" },
  { key: "profile", label: "User Profile" },
];

const wireframes = [
  { title: "Voya Home", activeNav: "home", content: <Home /> },
  { title: "Activity", content: <Activity /> },
  { title: "Plan A Trip", activeNav: "plan", content: <PlanTrip /> },
  { title: "Map", activeNav: "map", content: <MapPage /> },
  { title: "Popular Destinations", activeNav: "destinations", content: <Destinations /> },
  { title: "User Log In", content: <Auth title="Log In" button="Log In" fields={["Email", "Password"]} /> },
  { title: "User Sign Up", content: <Auth title="Sign Up" button="Sign Up" fields={["Email", "Password", "Confirm Password"]} /> },
  { title: "Add Trip", content: <AddTrip /> },
  { title: "User Profile", activeNav: "profile", content: <Profile /> },
];

function App() {
  return (
    <div className="wireframe-document">
      {wireframes.map((wireframe) => (
        <Wireframe key={wireframe.title} title={wireframe.title}>
          <Nav active={wireframe.activeNav} />
          {wireframe.content}
          <Footer />
        </Wireframe>
      ))}
    </div>
  );
}

function Wireframe({ title, children }) {
  return (
    <section className="wireframe-frame">
      <div className="wireframe-title">{title}</div>
      <div className="app">{children}</div>
    </section>
  );
}

function Nav({ active }) {
  return (
    <header className="nav">
      <button className="brand">VOYA</button>
      <nav className="nav-links" aria-label="Main navigation">
        {navItems.map((item) => (
          <button className={active === item.key ? "active" : ""} key={item.key}>
            {item.label}
          </button>
        ))}
        <button className="signin">Sign In</button>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <h2>VOYA</h2>
        <p>Plan your journey with elegance and ease. We bring you the finest destinations with a touch of sophistication.</p>
      </div>
      <div className="footer-links">
        <div>
          <h3>Company</h3>
          <a>About Us</a>
          <a>Popular Destinations</a>
          <a>Plan A Trip</a>
          <a>Map</a>
        </div>
        <div>
          <h3>Support</h3>
          <a>Contact us</a>
          <a>FAQs</a>
          <a>Privacy policy</a>
          <a>Sitemap</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Copyright 2026 Voya. All Rights Reserved</span>
        <span className="socials"><i>f</i><i>t</i><i>i</i><i>p</i></span>
      </div>
    </footer>
  );
}

function Home() {
  const cityCards = [
    ["Alaska: Westminster to Greenwich River Thames", assets.aurora],
    ["Alaska: Vintage Double Decker Bus Tour & Thames", assets.alaska],
    ["Alaska: Magic of London Tour with Afternoon Tea", assets.lake],
    ["Alaska: Volcanic Landscapes", assets.trees],
  ];

  return (
    <main className="page home">
      <section className="hero split">
        <div className="hero-copy">
          <h1>Plan<br />Smoothly<br />With <em>VOYA</em></h1>
          <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
          <div className="actions">
            <button className="primary">Start Planning</button>
            <button className="outline">Explore Map</button>
          </div>
        </div>
        <div className="hero-image blob"><img src={assets.beach} alt="Beach sunset" /></div>
      </section>

      <section className="section">
        <SectionHeading title="Explore Popular Cities" text="Curated experiences from around the world, selected for their unique character and timeless beauty." />
        <div className="city-grid staggered">
          {cityCards.map(([title, image], index) => <Card key={title} title={title} image={image} tall={index % 2 === 1} />)}
        </div>
      </section>

      <section className="section feature-strip">
        <SectionHeading title="Featured Destinations" text="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint." />
        <div className="wide-cards">
          {[assets.aurora, assets.alaskaView, assets.activity1].map((image, index) => (
            <article className="wide-card" key={image}>
              <img src={image} alt="" />
              <div><strong>Alaska: {["Westminster to Greenwich", "Vintage Double Decker", "Magic of London"][index]}</strong><span>$35.00 per person</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section split wildlife">
        <div className="round-image"><img src={assets.alaskaView} alt="Wildlife view" /></div>
        <div>
          <h2>Wildlife of Alaska</h2>
          <p>Amid misty ridgelines and crystalline lakes, Alaska offers a quiet, unforgettable journey through nature and open sky.</p>
          <button className="gold">Read More</button>
        </div>
      </section>
    </main>
  );
}

function SectionHeading({ title, text }) {
  return (
    <div className="section-heading">
      <div><h2>{title}</h2><span /></div>
      {text && <p>{text}</p>}
    </div>
  );
}

function Card({ title, image, tall }) {
  return (
    <article className={tall ? "card tall" : "card"}>
      <img src={image} alt="" />
      <h3>{title}</h3>
      <div className="card-meta"><span>2 Hours</span><span>Starts $35.00</span></div>
    </article>
  );
}

function PlanTrip() {
  return (
    <main className="page">
      <section className="center-hero">
        <h1>Plan Your Next Adventure</h1>
        <p>Design a journey that reflects your pace. Tell us your desires, and we'll craft the perfect escape.</p>
      </section>
      <section className="planner-panel">
        <div className="planner-grid">
          <Field label="Destination" value="Where to?" />
          <Field label="Dates" value="Select dates" />
          <Field label="Travelers" value="2 Adults" />
          <button className="primary">Find Your Next Adventure</button>
        </div>
        <div className="chips"><strong>Pace & Budget:</strong><button>Relaxed</button><button className="selected">Balanced</button><button>Luxury</button></div>
      </section>
      <section className="section">
        <SectionHeading title="Suggested Itineraries" />
        <div className="itinerary-grid">
          <ImageOverlay image={assets.amalfi} title="Amalfi Coast Serenity" text="A slow-paced journey through cliffside villages and pristine waters." large />
          <ImageOverlay image={assets.kyoto} title="Kyoto Retreat" text="Find balance in ancient temples and mindful traditions." />
        </div>
      </section>
    </main>
  );
}

function Destinations() {
  const cards = [
    ["Westminster to Greenwich River Thames", assets.river, "$35.00"],
    ["Tower of London and Crown Jewels Exhibition", assets.tower, "$42.50"],
    ["Borough Market Food Tasting Walking Tour", assets.market, "$55.00"],
    ["White Cliffs of Dover Tour", assets.coast, "$85.00"],
    ["Stonehenge Inner Circle", assets.stonehenge, "$120.00"],
    ["Oxford University Walking Tour", assets.oxford, "$65.00"],
  ];

  return (
    <main className="page destinations">
      <section className="destination-hero">
        <div><h1>Popular Destinations</h1><p>Discover handpicked experiences tailored for the discerning traveler.</p></div>
        <div className="selects"><button>Sort by: Popularity</button><button>All Categories</button></div>
      </section>
      <section className="section">
        <SectionHeading title="Things To Do In London" />
        <div className="destination-grid">
          {cards.slice(0, 3).map(([title, image, price]) => <TourCard key={title} title={title} image={image} price={price} />)}
        </div>
      </section>
      <section className="section">
        <SectionHeading title="Outside The City Specials" />
        <div className="chips"><button className="selected teal">Water Activities</button><button>Special Foods</button><button>River Activity</button><button>Historical Tours</button></div>
        <div className="destination-grid four">
          {cards.slice(3).concat([cards[5]]).map(([title, image, price], index) => <TourCard key={`${title}-${index}`} title={title} image={image} price={price} />)}
        </div>
      </section>
    </main>
  );
}

function TourCard({ title, image, price }) {
  return (
    <article className="tour-card">
      <img src={image} alt="" />
      <div className="rating">4.8</div>
      <h3>{title}</h3>
      <div className="tags"><span>2.5 Hours</span><span>Walking</span><span>Family Plan</span></div>
      <p><strong>{price}</strong> per person</p>
    </article>
  );
}

function ImageOverlay({ image, title, text, large }) {
  return (
    <article className={large ? "overlay-card large" : "overlay-card"}>
      <img src={image} alt="" />
      <div><span>7 Days</span><h3>{title}</h3><p>{text}</p></div>
    </article>
  );
}

function MapPage() {
  return (
    <main className="map-page">
      <div className="map-search">Search destinations, places...</div>
      <div className="map-filters"><button className="active">Hotels</button><button>Dining</button><button>Attractions</button><button>Cafes</button></div>
      <img className="map-bg" src={assets.map} alt="Map view" />
      <div className="pin active-pin">Villa d'Este</div>
      <div className="pin second-pin">Dining</div>
      <article className="location-card">
        <img src={assets.villa} alt="Villa d'Este" />
        <div><h2>Villa d'Este</h2><p>Lake Como, Italy</p><strong>4.9 (120 reviews)</strong></div>
      </article>
      <button className="locate">Target</button>
    </main>
  );
}

function Activity() {
  const gallery = [assets.gallery1, assets.gallery2, assets.gallery3, assets.gallery4, assets.activity1];
  return (
    <main className="page activity">
      <section className="activity-header">
        <div>
          <h1>Vintage Double Decker Bus Tour & Thames River Cruise</h1>
          <p>Top Rated Tour - 4.8 (8,940 reviews)</p>
        </div>
        <div className="booking-mini"><label>Currency</label><select><option>$71.81 USD</option></select><button className="primary">Add to Itinerary</button></div>
      </section>
      <section className="gallery">
        <img className="main-photo" src={assets.mountainView} alt="Mountain view" />
        <div>{gallery.map((image) => <img key={image} src={image} alt="" />)}</div>
      </section>
      <section className="article-copy">
        <h2>Description</h2>
        <p>See the highlights of London via classic modes of transport on this half-day adventure. Enjoy views of Westminster Abbey, the Houses of Parliament, and the London Eye while riding through historic streets.</p>
        <p>Continue to St Paul's Cathedral and the Tower of London before taking a short trip along the River Thames, passing Shakespeare's Globe and London Bridge.</p>
        <h2>Activity</h2>
        <ul><li>Discover London on board a classic Routemaster bus</li><li>Cruise down the River Thames</li><li>See the Changing of the Guard</li><li>Learn the stories of the Tower of London</li></ul>
      </section>
      <img className="activity-map" src={assets.basemap} alt="Route map" />
      <section className="section related">
        <SectionHeading title="Related Activities In Alaska" />
        <div className="destination-grid four">
          {[assets.activity1, assets.activity2, assets.activity3, assets.activity4].map((image, index) => <TourCard key={image} title={`Alaska: ${["Mountains to Oceans", "Popular Glacier Destination", "Magic of London Tour", "Magic of London Tour #2"][index]}`} image={image} price={`$${[25, 35, 55, 65][index]}.00`} />)}
        </div>
      </section>
    </main>
  );
}

function Auth({ title, button, fields }) {
  return (
    <main className="page auth-page">
      <section className="form-card auth-card">
        <h1>{title}</h1>
        {fields.map((field) => <Field key={field} label={field} value={field === "Email" ? "FakeEmail@Gmail.com" : "**********"} />)}
        <button className="primary">{button}</button>
      </section>
    </main>
  );
}

function AddTrip() {
  return (
    <main className="page auth-page">
      <section className="form-card trip-card">
        <h1>Add Trip</h1>
        <Field label="Destination*" value="Alaska, USA" />
        <div className="two-col"><Field label="Start Date*" value="07/24/26" /><Field label="End Date*" value="08/01/26" /></div>
        <Field label="Number Of Travelers" value="2" />
        <Field label="Travelers" value="FakeEmail@Gmail.com, FakeEmail@Gmail.com" />
        <Field label="Flight" value="Alaska Airlines 227" />
        <Field label="Hotel" value="Holiday Inn" />
        <Field label="Activities" value="Sledding, hiking" />
        <button className="primary">Add Trip</button>
      </section>
    </main>
  );
}

function Field({ label, value }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input value={value} readOnly />
    </label>
  );
}

function Profile() {
  return (
    <main className="profile-page">
      <aside className="profile-side">
        <img src={assets.profile} alt="Profile" />
        <h2>Masum Rana</h2>
        <p>Gothenburg</p>
        <p>15th February</p>
        <button className="active">Personal Info</button>
        <button>Trips</button>
        <button>Shared Itineraries</button>
        <button>Notifications</button>
      </aside>
      <section className="profile-main">
        <h1>My Profile</h1>
        <p>Manage your travel preferences and personal details.</p>
        <ProfilePanel title="Personal Information">
          <div className="two-col"><Field label="Name" value="Masum Rana" /><Field label="Date of Birth" value="15/03/1886" /></div>
          <div className="two-col"><Field label="Phone" value="+46-7644 394 68" /><Field label="Location" value="Gothenburg" /></div>
          <button className="primary small">Save</button>
        </ProfilePanel>
        <ProfilePanel title="Security">
          <Field label="Email Address" value="masumrana15@gmail.com" />
          <div className="two-col"><Field label="Password" value="********" /><Field label="Confirm Password" value="********" /></div>
          <button className="primary small">Save</button>
        </ProfilePanel>
      </section>
    </main>
  );
}

function ProfilePanel({ title, children }) {
  return (
    <section className="profile-panel">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

export default App;
