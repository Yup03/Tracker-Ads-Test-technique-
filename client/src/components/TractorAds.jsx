// Composant principal pour l'affichage des annonces de tracteurs
const TractorAds = ({ tractorAds }) => {
  return (
    <ul className="space-y-4 lg:w-1/2 mb-6 lg:mb-0">
      {tractorAds.map(ad => (
        <li
          key={ad.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
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
      ))}
    </ul>
  )
}

export default TractorAds
