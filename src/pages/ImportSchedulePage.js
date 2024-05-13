import React, { useState } from "react"
import PageHeader from "../components/PageHeader"
import "../styles/FormStyle.css"

function ImportSchedulePage() {
  const [file, setFile] = useState(null)
  const [email, setEmail] = useState("")
  const [imie, setImie] = useState("")
  const [nazwisko, setNazwisko] = useState("")
  const [secret, setSecret] = useState("")
  const [uploadMessage, setUploadMessage] = useState("")

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleImport = async () => {
    if (file) {
      const formData = new FormData()
      formData.append("email", email)
      formData.append("imie", imie)
      formData.append("nazwisko", nazwisko)
      formData.append("secret", secret)
      formData.append("file", file)

      try {
        const response = await fetch("http://192.109.240.120:8080/", {
          method: "POST",
          body: formData,
        })

        const resultText = await response.text()
        console.log(resultText)
        setUploadMessage(resultText)
      } catch (error) {
        console.error("Error:", error)
        setUploadMessage("Failed to upload file.")
      }
    } else {
      setUploadMessage("Please select a file to upload.")
    }
  }

  return (
    <div>
      <PageHeader title="Importuj Harmonogram" />
      <div className="form-container">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="text"
          value={imie}
          onChange={(e) => setImie(e.target.value)}
          placeholder="Imię"
        />
        <input
          type="text"
          value={nazwisko}
          onChange={(e) => setNazwisko(e.target.value)}
          placeholder="Nazwisko"
        />
        <input
          type="text"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="Secret"
        />
        <input
          type="file"
          accept=".ics"
          onChange={handleFileChange}
        />
        <button
          className="form-button"
          onClick={handleImport}
        >
          Importuj
        </button>
        {uploadMessage && <div className="upload-message">{uploadMessage}</div>}
      </div>
    </div>
  )
}

export default ImportSchedulePage
