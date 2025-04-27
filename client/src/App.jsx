import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import CreateAdModal from "./components/CreateAdModal"
import AdProvider from "./context/AdContext"

function App() {
  return (
    <Router>
      <AdProvider>
        <Routes>
          <Route path="/" element={<Homepage />}>
            <Route path="/creer-annonce" element={<CreateAdModal />} />
          </Route>
        </Routes>
      </AdProvider>
    </Router>
  )
}

export default App
