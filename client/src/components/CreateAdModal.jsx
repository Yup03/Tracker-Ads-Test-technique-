import { useEffect, useState } from "react"
import { useAdContext } from "../context/AdContext"
import { useNavigate, useSearchParams } from "react-router-dom"

// Cities data with coordinates
const cities = [
  { name: "Dakar", latitude: 14.7167, longitude: -17.4677 },
  { name: "Thiès", latitude: 14.791, longitude: -16.9359 },
  { name: "Saint-Louis", latitude: 16.0326, longitude: -16.4818 },
  { name: "Ziguinchor", latitude: 12.5645, longitude: -16.2886 },
  { name: "Kaolack", latitude: 14.1652, longitude: -16.0726 },
  { name: "Tambacounda", latitude: 13.7707, longitude: -13.6673 },
  { name: "Louga", latitude: 15.6173, longitude: -16.224 },
  { name: "Fatick", latitude: 14.339, longitude: -16.4154 },
  { name: "Matam", latitude: 15.6559, longitude: -13.2548 },
  { name: "Kolda", latitude: 12.8983, longitude: -14.9412 },
  { name: "Kédougou", latitude: 12.8439, longitude: -12.2524 },
  { name: "Sédhiou", latitude: 12.9028, longitude: -15.5648 },
  { name: "Diourbel", latitude: 14.7801, longitude: -16.0359 },
  { name: "Kaffrine", latitude: 14.2271, longitude: -15.2462 },
]

const CreateAdModal = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { lat, lng } = Object.fromEntries(searchParams)
  const { createAnnounce } = useAdContext()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    latitude: "",
    longitude: "",
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  // Handle city selection and update coordinates
  const handleCityChange = e => {
    const selectedCity = e.target.value
    const cityData = cities.find(city => city.name === selectedCity)

    if (cityData) {
      setFormData(prevState => ({
        ...prevState,
        location: selectedCity,
        latitude: cityData.latitude,
        longitude: cityData.longitude,
      }))
    } else {
      setFormData(prevState => ({
        ...prevState,
        location: selectedCity,
        latitude: "",
        longitude: "",
      }))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    createAnnounce(formData)
    setFormData({
      title: "",
      description: "",
      price: "",
      location: "",
      latitude: "",
      longitude: "",
    })
    navigate("/")
  }

  useEffect(() => {
    const getCity = async () => {
      const res = await fetch(
        `https://us1.api-bdc.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=fr`
      )
      const data = await res.json()

      setFormData(prevState => ({
        ...prevState,
        location: data.principalSubdivision || data.locality || data.city,
        latitude: lat,
        longitude: lng,
      }))
    }

    if (lat && lng) getCity()
  }, [lat, lng])

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-[1100]">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Nouvelle annonce</h2>
            <button
              onClick={() => navigate("/")}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Titre de l'annonce
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: Tracteur Massey Ferguson 135"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Décrivez votre tracteur en détail..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Prix (FCFA)
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Ex: 2500000"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Localisation
              </label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleCityChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Sélectionnez une ville</option>
                {cities.map(city => (
                  <option key={city.name} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              {formData.latitude && formData.longitude && (
                <p className="text-xs text-gray-500 mt-1">
                  Coordonnées: {formData.latitude}, {formData.longitude}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="latitude"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Latitude
                </label>
                <input
                  type="number"
                  id="latitude"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  placeholder="Ex: 14.7167"
                  step="any"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  readOnly
                />
              </div>

              <div>
                <label
                  htmlFor="longitude"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Longitude
                </label>
                <input
                  type="number"
                  id="longitude"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  placeholder="Ex: -17.4677"
                  step="any"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  readOnly
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 "
              >
                Créer l'annonce
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateAdModal
