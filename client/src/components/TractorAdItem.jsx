import { useAdContext } from "../context/AdContext"

const TractorAdItem = ({ ad }) => {
  const { handleDelete } = useAdContext()

  return (
    <li className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative">
      {/* Bouton supprimer */}
      <button
        onClick={() => handleDelete(ad.id)}
        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
      >
        ✕
      </button>
      {/* En-tête de l'annonce */}
      <h2 className="text-xl font-semibold mb-2">{ad.title}</h2>
      {/* Description du tracteur */}
      <p className="text-gray-600 mb-3">{ad.description}</p>
      {/* Pied de l'annonce avec prix et localisation */}
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold text-green-600">{ad.price}</span>
        <span className="text-gray-500">📍 {ad.location}</span>
      </div>
    </li>
  )
}

export default TractorAdItem
