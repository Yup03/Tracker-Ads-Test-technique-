// Composant principal pour l'affichage des annonces de tracteurs
import TractorAdItem from "./TractorAdItem"

const TractorAds = ({ tractorAds, isLoading }) => {
  // Affichage d'un indicateur de chargement si les données sont en cours de chargement
  if (isLoading) {
    return (
      <div className="lg:w-1/2 flex items-center justify-center">
        <div className="loader" />
      </div>
    )
  }

  // Si aucune annonce n'est disponible, afficher un message
  if (tractorAds.length === 0) {
    return (
      <div className="lg:w-1/2 flex items-center justify-center">
        <p className="text-gray-500">
          Aucune annonce disponible pour le moment.
        </p>
      </div>
    )
  }

  // Affichage de la liste des annonces de tracteurs
  return (
    <ul className="space-y-4 lg:w-1/2 mb-6 lg:mb-0">
      {tractorAds.map(ad => (
        <TractorAdItem key={ad.id} ad={ad} />
      ))}
    </ul>
  )
}

export default TractorAds
