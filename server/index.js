const fs = require("fs")
const express = require("express")
const cors = require("cors")

const app = express()

const annonces = JSON.parse(fs.readFileSync("announces.json", "utf8"))

app.use(cors())

app.get("/api/announces", (req, res) => {
  res.status(200).json({ status: "success", data: annonces })
})

app.listen(221, () => {
  console.log("Server is running on port 221")
})
