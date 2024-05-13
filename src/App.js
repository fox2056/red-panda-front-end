import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import MainPlanPage from "./pages/MainPlanPage"
import ImportSchedulePage from "./pages/ImportSchedulePage"
import "./styles/App.css"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<MainPlanPage />}
        />
        <Route
          path="/import-schedule"
          element={<ImportSchedulePage />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
