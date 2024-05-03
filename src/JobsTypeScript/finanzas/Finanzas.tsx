import React, { useState } from "react";
import { Container, Paper, TextField, Button, InputLabel, Select, MenuItem, TableContainer, TableHead, Table, TableRow, TableBody, TableCell } from "@material-ui/core";
import { Bar } from 'react-chartjs-2';

interface Transaction {
    precio: number;
    categoria: string;
    fecha: string;
}

const AppFinanzas: React.FC = () => {
    const [rows, setRows] = useState<Transaction[]>([]);
    const [transaction, setTransaction] = useState<Transaction>({
        precio: 0,
        categoria: "",
        fecha: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Transaction) => {
        const { value } = e.target;
        setTransaction((prev) => ({
            ...prev,
            [field]: field === "precio" ? parseFloat(value) : value
        }));
    };

    const handleSave = () => {
        const newTransaction: Transaction = {
            precio: transaction.precio,
            categoria: transaction.categoria,
            fecha: transaction.fecha
        };
        setRows([...rows, newTransaction]);
        setTransaction({ precio: 0, categoria: "", fecha: "" });
    };

    const handleInputCategoria=(event: React.ChangeEvent<{ value: string }>)=>{
        setTransaction({...transaction, categoria:event.target.value})
    }
    const chartData = {
        labels: rows.map((row) => row.categoria),
        datasets: [
            {
                label: "Precio por categoría",
                data: rows.map((row) => row.precio),
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
                backgroundColor: [
                    'rgb(153, 102, 255)'
                ]
            }
        ]
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <Container component="main" style={{ margin: '50px auto' }}>
            <Paper>
                <form style={{ display: "flex", gap: 8 }}>
                    <TextField
                        label="Precio"
                        type="number"
                        value={transaction.precio}
                        onChange={(e) => handleInputChange(e, "precio")}
                        required
                    />
                    <TextField
                        label="Fecha"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={transaction.fecha}
                        onChange={(e) => handleInputChange(e, "fecha")}
                        required
                    />
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={transaction.categoria}
                        label="Categoria"
                        onChange={(e)=>handleInputCategoria}
                    >
                        <MenuItem value="Electrodoméstico">Electrodoméstico</MenuItem>
                        <MenuItem value="Ropa">Ropa</MenuItem>
                        <MenuItem value="Comida">Comida</MenuItem>
                        <MenuItem value="Limpieza">Limpieza</MenuItem>
                        <MenuItem value="Animal">Animal</MenuItem>
                    </Select>
                    <Button variant="outlined" color="primary" type="button" onClick={handleSave}>SAVE</Button>
                </form>
            </Paper>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Precio</TableCell>
                            <TableCell align="right">Categoría</TableCell>
                            <TableCell align="right">Fecha</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {row.precio}
                                </TableCell>
                                <TableCell align="right">{row.categoria}</TableCell>
                                <TableCell align="right">{row.fecha}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Paper style={{ marginTop: 30 }}>
                <Bar data={chartData} options={chartOptions} />
            </Paper>
        </Container>
    );
};

export default AppFinanzas;
