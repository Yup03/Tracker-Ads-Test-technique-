const express = require("express")
const cors = require("cors")

const app = express()

let announces = [
  {
    id: 1,
    title: "Tracteur Massey Ferguson 135",
    description:
      "Excellent état, faible kilométrage, parfait pour petites exploitations",
    price: "2 500 000 FCFA",
    location: "Saint-Louis",
    coordinates: [16.0326, -16.4818],
  },
  {
    id: 2,
    title: "John Deere 5090M",
    description: "Modèle récent, climatisation, très économique en carburant",
    price: "4 800 000 FCFA",
    location: "Dakar",
    coordinates: [14.7167, -17.4677],
  },
  {
    id: 3,
    title: "New Holland T6020",
    description:
      "Transmission automatique, cabine confortable, idéal pour grandes surfaces",
    price: "3 900 000 FCFA",
    location: "Thiès",
    coordinates: [14.791, -16.9359],
  },
  {
    id: 4,
    title: "Kubota M7060",
    description: "Compact et puissant, parfait état, entretien régulier",
    price: "3 200 000 FCFA",
    location: "Kaolack",
    coordinates: [14.1652, -16.0726],
  },
]

app.use(express.json())
app.use(cors())

app.get("/api/announces", (req, res) => {
  res.status(200).json({ status: "success", data: announces })
})
// Delete
app.route("/api/announces/:id").delete((req, res) => {
  const id = +req.params.id
  announces = announces.filter(announce => announce.id !== id)

  res.status(204).json({ status: "success" })
})

app.route("/api/announces").post((req, res) => {
  const { title, description, price, location, latitude, longitude } = req.body

  const newAnnounce = {
    id: announces.length + 1,
    title,
    description,
    price,
    location,
    coordinates: [+latitude, +longitude],
  }

  announces.push(newAnnounce)

  res.status(201).json({ status: "success", data: newAnnounce })
})

app.listen(221, () => {
  console.log("Server is running on port 221")
})
