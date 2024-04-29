import React, { useState } from "react";
import { Container, Paper, TextField, Button } from "@material-ui/core";

interface Transaction {
  precio: number;
  categoria: string;
  fecha: Date;
}

const AppFinanzas: React.FC = () => {
  const [transaction, setTransaction] = useState<Transaction>({
    precio: 0,
    categoria: "",
    fecha: new Date(),
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Transaction
  ) => {
    const { value } = e.target;
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      [field]: field === "precio" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(transaction); // Aquí podrías enviar los datos a tu backend o realizar alguna otra acción
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Precio"
            type="number"
            value={transaction.precio}
            onChange={(e) => handleInputChange(e, "precio")}
            fullWidth
            required
          />
          <TextField
            label="Categoría"
            value={transaction.categoria}
            onChange={(e) => handleInputChange(e, "categoria")}
            fullWidth
            required
          />
          <TextField
            label="Fecha"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={transaction.fecha.toISOString().slice(0, 10)}
            onChange={(e) => handleInputChange(e, "fecha")}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Registrar Transacción
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AppFinanzas;
