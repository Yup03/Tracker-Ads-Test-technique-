import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet"
import { Icon } from "leaflet"
import "leaflet/dist/leaflet.css"
import { useNavigate } from "react-router-dom"

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
        center={[14.21, -15.79]} // Centré sur le pays
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
          <Marker position={ad.coordinates} icon={markertIcon} key={ad.id}>
            <Popup>{ad.location}</Popup>
          </Marker>
        ))}
        <DetectClick />
      </MapContainer>
      <h2>
        Vous pouvez aussi{" "}
        <strong className="text-green-500">clicker un endroit</strong> sut la
        carte pour <em className="text-green-600">ajouter une annonce</em>.
      </h2>
    </div>
  )
}

const DetectClick = () => {
  const navigate = useNavigate()
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      navigate(`/creer-annonce?lat=${lat}&lng=${lng}`)

      return false // prevent regular marker stuff
    },
  })
}
export default Map
