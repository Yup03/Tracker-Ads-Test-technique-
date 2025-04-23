import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import AdProvider from "./context/AdContext.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdProvider>
      <App />
    </AdProvider>
  </StrictMode>
)
