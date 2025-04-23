import { createContext, useContext, useEffect, useState } from "react"

const AdContext = createContext()
export default function AdProvider({ children }) {
  const [tractorAds, setTractorAds] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Code de chargement des annonces de tracteurs depuis une API
  const getAnnounces = async () => {
    try {
      setIsLoading(true)
      const res = await fetch("http://localhost:221/api/announces")
      const { data } = await res.json()

      setTractorAds(data)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete(id) {
    // Effectuer la requête DELETE pour supprimer l'annonce
    try {
      await fetch(`http://localhost:221/api/announces/${id}`, {
        method: "DELETE",
      })

      //   Recupérer la liste des annonces mise à jour
      getAnnounces()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAnnounces()
  }, [tractorAds.length])

  return (
    <AdContext.Provider value={{ tractorAds, isLoading, handleDelete }}>
      {children}
    </AdContext.Provider>
  )
}

export const useAdContext = () => useContext(AdContext)
