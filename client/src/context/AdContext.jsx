import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { useSearchParams, useNavigate } from "react-router-dom"

const AdContext = createContext()
export default function AdProvider({ children }) {
  const [tractorAds, setTractorAds] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [nextPage, setNextPage] = useState()
  const [previousPage, setPreviousPage] = useState()
  const [searchParams, setSearchParams] = useSearchParams()
  const { navigate } = useNavigate()
  const currentPage = searchParams.get("page") || 1

  const baseUrl = "http://localhost:221/api/announces"

  // Code de chargement des annonces de tracteurs depuis une API
  const getAnnounces = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await fetch(`${baseUrl}?page=${currentPage}`)
      const { data } = await res.json()
      if (!res.ok) {
        throw new Error("Erreur lors de la récupération des annonces")
      }

      console.log(data)
      setTractorAds(data?.results)
      setNextPage(data?.next?.page)
      setPreviousPage(data?.previous?.page)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [currentPage])

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
  }, [getAnnounces])

  return (
    <AdContext.Provider
      value={{
        tractorAds,
        isLoading,
        deleteAnnounce,
        createAnnounce,
        previousPage,
        nextPage,
      }}
    >
      {children}
    </AdContext.Provider>
  )
}

export const useAdContext = () => useContext(AdContext)
