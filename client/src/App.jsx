import { useEffect, useState } from "react"
import TractorAds from "./components/TractorAds"
import Map from "./components/Map"

function App() {
  // Données factices des annonces de tracteurs
  const [tractorAds, setTractorAds] = useState([])

  useEffect(() => {
    // Code de chargement des annonces de tracteurs depuis une API
    const getAnnounces = async () => {
      try {
        const res = await fetch(
          "https://tracker-ads-test-technique.onrender.com/api/announces"
        )
        const { data } = await res.json()

        setTractorAds(data)
      } catch (error) {
        console.error(error)
      }
    }

    getAnnounces()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 mt-10">
      {/* Titre principal de la page */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Annonces de Tracteurs
      </h1>
      <div className="lg:flex lg:gap-6 container mx-auto p-4">
        {/* Annonces tracteurs */}
        <TractorAds tractorAds={tractorAds} />
        {/* Carte */}
        <Map tractorAds={tractorAds} />
      </div>
    </div>
  )
}

export default App
