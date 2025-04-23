import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Icon } from "leaflet"
import "leaflet/dist/leaflet.css"

const Map = ({ tractorAds }) => {
  const markertIcon = new Icon({
    iconUrl:
      "https://www.iconpacks.net/icons/2/free-location-pin-icon-2965-thumb.png",
    iconSize: [35, 35], // size of the icon
    iconAnchor: [22, 40], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -40], // point from which the popup should open relative to the iconAnchor
  })

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
          <Marker position={ad.coordinates} icon={markertIcon}>
            <Popup>{ad.location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
export default Map
