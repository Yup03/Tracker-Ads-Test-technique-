import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

const Map = ({ tractorAds }) => {
  return (
    <div className="lg:w-1/2 h-[500px]">
      <MapContainer
        center={[14.7167, -17.4677]} // Centré sur Dakar
        zoom={7}
        scrollWheelZoom={false}
        className="rounded-lg shadow-md h-[600px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Marqueurs pour chaque annonce */}
        {tractorAds.map(ad => (
          <Marker position={ad.coordinates}>
            <Popup>{ad.location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
export default Map
