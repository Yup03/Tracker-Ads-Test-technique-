// Composant principal pour l'affichage des annonces de tracteurs
import { useSearchParams } from "react-router-dom"
import { useAdContext } from "../context/AdContext"
import TractorAdItem from "./TractorAdItem"

const TractorAds = () => {
  const { tractorAds, isLoading } = useAdContext()

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
    <div className="lg:w-1/2">
      <ul className="space-y-4 mb-6 lg:mb-0">
        {tractorAds.map(ad => (
          <TractorAdItem key={ad.id} ad={ad} />
        ))}
      </ul>
      <Pagination />
    </div>
  )
}

const Pagination = () => {
  const { previousPage, nextPage } = useAdContext()
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <div className="mt-5 flex justify-end">
      <button
        className="p-3 rounded-l-xl border border-gray-400"
        onClick={() => {
          if (!previousPage) return
          searchParams.set("page", previousPage)
          setSearchParams(searchParams)
        }}
      >
        Page précédente
      </button>
      <button
        className={`p-3 rounded-r-xl border border-gray-400 ${
          nextPage ? "cursor-pointer" : "cursor-not-allowed"
        }`}
        onClick={() => {
          if (!nextPage) return
          searchParams.set("page", nextPage)
          setSearchParams(searchParams)
        }}
      >
        Page suivante
      </button>
    </div>
  )
}
export default TractorAds
