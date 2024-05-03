import React from "react";
import { useState } from "react"
import { TextField, Button } from "@material-ui/core"
import { useTranslation } from "react-i18next";


export default function Translation() {
  const [frase, setFrase] = useState<string>("");
  const { t, i18n } = useTranslation();
  const [newFrase, setNewFrase] = useState<string | undefined>()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFrase(e.target.value);
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFrase(""); 
  }
  const handleTranslate = (lng: string) => {
    i18n.changeLanguage(lng)
  }
  const handleFrase = () => {
    setNewFrase(frase)
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField type="text" value={frase} onChange={(e) => handleChange(e)}></TextField>
        <Button type="submit" onClick={handleFrase}>FRASE</Button>
      </form>
      <div>
        {t(newFrase)}
      </div>
      <Button onClick={() => (handleTranslate("en"))}>English</Button>
      <Button onClick={() => (handleTranslate("es"))}>French</Button>
    </>
  )
}

