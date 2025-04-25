import { createContext, useContext, useEffect, useState } from "react"

const AdContext = createContext()
export default function AdProvider({ children }) {
  const [tractorAds, setTractorAds] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const baseUrl = "http://localhost:221/api/announces"

  // Code de chargement des annonces de tracteurs depuis une API
  const getAnnounces = async () => {
    try {
      setIsLoading(true)
      const res = await fetch(baseUrl)
      const { data } = await res.json()

      setTractorAds(data)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function deleteAnnounce(id) {
    // Effectuer la requête DELETE pour supprimer l'annonce
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
      })

      // Recupérer la liste des annonces mise à jour
      getAnnounces()
    } catch (error) {
      console.error(error)
    }
  }

  async function createAnnounce(announce) {
    console.log(announce)
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(announce),
      })

      getAnnounces()
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAnnounces()
  }, [tractorAds.length])

  return (
    <AdContext.Provider
      value={{ tractorAds, isLoading, deleteAnnounce, createAnnounce }}
    >
      {children}
    </AdContext.Provider>
  )
}

export const useAdContext = () => useContext(AdContext)
