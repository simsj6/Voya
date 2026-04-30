import {
  CircleMarker,
  MapContainer,
  Popup,
  Polyline,
  TileLayer,
} from 'react-leaflet'
import { mapStops } from '../data/siteContent'

function MapPage() {
  return (
    <section className="form-page form-page-profile">
      <div className="content-panel">
        <div className="page-heading">
          <h1>Map</h1>
          <p>
            See how your route flows before you confirm flights, stays, and daily
            experiences.
          </p>
        </div>

        <div className="map-layout">
          <section className="map-canvas" aria-label="Trip route map">
            <MapContainer
              center={mapStops[1].position}
              zoom={5}
              scrollWheelZoom={false}
              className="leaflet-map"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Polyline
                positions={mapStops.map((stop) => stop.position)}
                pathOptions={{ color: '#117b86', weight: 4, opacity: 0.85 }}
              />

              {mapStops.map((stop) => (
                <CircleMarker
                  key={stop.name}
                  center={stop.position}
                  radius={10}
                  pathOptions={{
                    color: '#117b86',
                    weight: 3,
                    fillColor: '#ffffff',
                    fillOpacity: 1,
                  }}
                >
                  <Popup>
                    <strong>{stop.name}</strong>
                    <br />
                    {stop.days}
                    <br />
                    {stop.description}
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </section>

          <aside className="map-sidebar">
            <h2>Route Summary</h2>
            {mapStops.map((stop) => (
              <div key={stop.name} className="map-stop">
                <strong>
                  {stop.days}: {stop.name}
                </strong>
                <p>{stop.description}</p>
              </div>
            ))}
            <a className="planner-button" href="#activity">
              View Activities
            </a>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default MapPage
