const express = require("express")
const cors = require("cors")
const app = express()

// Tableau des annonces de tracteurs avec données factices
let announces = [
  {
    id: 1,
    title: "Tracteur Massey Ferguson 290",
    description:
      "Tracteur robuste idéal pour les grandes exploitations agricoles.",
    price: 8500000,
    location: "Dakar",
    latitude: 14.6928,
    longitude: -17.4467,
  },
  {
    id: 2,
    title: "Tracteur John Deere Série 5E",
    description: "Excellente maniabilité et faible consommation de carburant.",
    price: 9200000,
    location: "Thiès",
    latitude: 14.7896,
    longitude: -16.938,
  },
  {
    id: 3,
    title: "Tracteur New Holland TT4",
    description: "Parfait pour les petits et moyens agriculteurs.",
    price: 7800000,
    location: "Saint-Louis",
    latitude: 16.0179,
    longitude: -16.4897,
  },
  {
    id: 4,
    title: "Tracteur Kubota L4701",
    description: "Puissant, fiable et facile à entretenir.",
    price: 8900000,
    location: "Ziguinchor",
    latitude: 12.5833,
    longitude: -16.2719,
  },
  {
    id: 5,
    title: "Tracteur Case IH Farmall JX",
    description: "Performance exceptionnelle pour divers travaux agricoles.",
    price: 9100000,
    location: "Kaolack",
    latitude: 14.1825,
    longitude: -16.2533,
  },
  {
    id: 6,
    title: "Tracteur Sonalika DI 750 III",
    description: "Modèle économique avec grande efficacité.",
    price: 6700000,
    location: "Tambacounda",
    latitude: 13.7707,
    longitude: -13.6673,
  },
  {
    id: 7,
    title: "Tracteur Deutz-Fahr Agrolux 80",
    description: "Compact et polyvalent pour toutes les tâches.",
    price: 8300000,
    location: "Louga",
    latitude: 15.6144,
    longitude: -16.2242,
  },
  {
    id: 8,
    title: "Tracteur Mahindra 265 DI",
    description: "Haute durabilité avec un excellent rapport qualité-prix.",
    price: 6200000,
    location: "Fatick",
    latitude: 14.3396,
    longitude: -16.4101,
  },
]

// Configuration des middlewares
app.use(express.json())
app.use(cors())

// Récupérer les annonces avec pagination
app.get("/api/announces", (req, res) => {
  // Récupération des paramètres de pagination depuis la requête
  const page = +req.query.page || 1
  const limit = +req.query.limit || 3
  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  // Préparation de l'objet de résultat
  const results = {
    page: {},
  }

  // Ajout des informations de pagination pour la page suivante si elle existe
  if (endIndex < announces.length) {
    results.next = {
      page: page + 1,
      limit: limit,
    }
  }

  // Ajout des informations de pagination pour la page précédente si elle existe
  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    }
  }

  // Ajout des métadonnées de pagination
  results.totalPages = Math.ceil(announces.length / limit)
  results.currentPage = page
  results.count = announces.length
  // Extraction des annonces pour la page demandée
  results.results = announces.slice(startIndex, endIndex)

  // Envoi de la réponse au format JSON
  res.status(200).json({ status: "success", data: results })
})

// Supprimer une annonce par son ID
app.route("/api/announces/:id").delete((req, res) => {
  id = +req.params.id
  // Filtrage des annonces pour exclure celle à supprimer
  announces = announces.filter(announce => announce.id !== id)

  // Réponse avec code 204 (No Content) pour indiquer le succès sans contenu
  res.status(204).json({ status: "success" })
})

// Créer une nouvelle annonce
app.route("/api/announces").post((req, res) => {
  // Extraction des données du corps de la requête
  const { title, description, price, location, latitude, longitude } = req.body

  // Création d'un nouvel objet annonce
  const newAnnounce = {
    id: announces.length + 1,
    title,
    description,
    price,
    location,
    latitude,
    longitude,
  }

  // Ajout de la nouvelle annonce au début du tableau (pour qu'elle apparaisse en premier)
  announces = [newAnnounce, ...announces]

  // Réponse avec code 201 (Created) et les données de la nouvelle annonce
  res.status(201).json({ status: "success", data: newAnnounce })
})

// Démarrage du serveur sur le port 221
app.listen(221, () => {
  console.log("Server is running on port 221")
})
