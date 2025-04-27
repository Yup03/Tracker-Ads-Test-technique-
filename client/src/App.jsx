import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import CreateAdModal from "./components/CreateAdModal"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />}>
          <Route path="/creer-annonce" element={<CreateAdModal />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
