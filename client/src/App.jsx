import TractorAds from "./components/TractorAds"
import Map from "./components/Map"
import { useAdContext } from "./context/AdContext"
import { useState } from "react"
import CreateAdModal from "./components/CreateAdModal"

function App() {
  const { tractorAds, isLoading } = useAdContext()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center">
            Annonces de Tracteurs
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Nouvelle annonce
          </button>
        </div>
      </div>

      <div className="lg:flex lg:gap-6 container mx-auto p-4">
        <TractorAds tractorAds={tractorAds} isLoading={isLoading} />
        <Map tractorAds={tractorAds} />
      </div>

      <CreateAdModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}

export default App
