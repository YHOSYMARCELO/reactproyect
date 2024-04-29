import React from "react"
import { useState } from "react"
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Container, Paper, TextField, Button, InputLabel, Select, MenuItem, TableContainer, TableHead, Table, TableRow, TableBody, TableCell } from "@material-ui/core";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
interface Props {

}
interface Transaction {
    precio: number,
    categoria: string,
    fecha: string
}
function createData(
    precio: number,
    categoria: string, fecha: string) {
    return { precio, categoria, fecha }
}
const currentDate = new Date();
/*const rows = [
    createData(6, "Electrodoméstico", currentDate),
    createData(9, "Ropas", currentDate ), 
    createData(10, "Comida", currentDate), 
    createData(17, "Limpieza", currentDate), 
    createData(30, "Animal", currentDate)
]*/

const AppFinanzas: React.FC<Props> = () => {
    const [rows, setRows] = useState<Transaction[]>([
        createData(6, "Electrodoméstico", currentDate.toISOString().slice(0, 10)),
        createData(9, "Ropas", currentDate.toISOString().slice(0, 10)),
    ])
    const [transaction, setTransaction] = useState<Transaction>({
        precio: 0,
        categoria: "",
        fecha: "12-10-2023",
    })

    const data = {
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
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: keyof Transaction
    ) => {
        const { value } = e.target;
        setTransaction((prev) => ({
            ...prev,
            [field]: field === "precio" ? parseFloat(value) : field === "fecha" ? new Date(value)  : value
        }));
    };

    const handleSave = () => {
        const transaccion: Transaction = {
            precio: transaction.precio,
            categoria: transaction.categoria,
            fecha: transaction.fecha

        }
        setRows([...rows, transaccion]);
        setTransaction({ precio: 0, categoria: "", fecha: "" })
    }

    return (
        <>
            <Container component="main" style={{margin:'50px auto'}}>
                <Paper>
                    <form style={{ display: "flex", gap: 8 }}>
                        <TextField
                            label="Precio"
                            type="number"
                            value={transaction.precio}
                            onChange={(e) => handleChange(e, "precio")}
                            required
                        />

                        <TextField
                            label="Fecha"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={transaction.fecha}
                            onChange={(e) => handleChange(e, "fecha")}
                            required
                        />

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={transaction.categoria}
                            label="Categoria"
                            onChange={(e) => handleChange}
                        >
                            <MenuItem value="Electrodoméstico">Electrodoméstico</MenuItem>
                            <MenuItem value="Ropa">Ropa</MenuItem>
                            <MenuItem value="Comida">Comida</MenuItem>
                            <MenuItem value="Limpieza">Limpieza</MenuItem>
                            <MenuItem value="Animal">Animal</MenuItem>
                        </Select>

                        <Button variant="outlined" color="primary" type="submit" onClick={handleSave}>SAVE</Button>
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
                                <TableRow
                                    key={index}

                                >
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

                <Paper style={{marginTop:30}}>
                    <Bar data={data} options={chartOptions} />
                </Paper>
            </Container >
        </>)
}
export default AppFinanzas