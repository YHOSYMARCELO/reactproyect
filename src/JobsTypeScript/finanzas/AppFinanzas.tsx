import React from "react"
import { useState, useEffect } from "react"
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
import { Container, Paper, TextField, Button, Select, MenuItem, TableContainer, TableHead, Table, TableRow, TableBody, TableCell } from "@material-ui/core";

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
    fecha: Date | null
}
function createData(precio: number, categoria: string, fecha: Date) {
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
        createData(6, "Electrodoméstico", currentDate),
        createData(9, "Ropas", currentDate),
        createData(6, "Electrodoméstico", currentDate),
        createData(9, "Ropas", currentDate),
    ])
    const [transaction, setTransaction] = useState<Transaction>({
        precio: 0,
        categoria: "",
        fecha: new Date(),
    })
    const [searchFecha, setSearchFecha] = useState<Date | null>(null);

    const [searchCategoria, setSearchCategoria] = useState<string>();
    
        useEffect(() => {
           
            const uniqueCategories = [...new Set(rows.map(row => row.categoria))];
            const uniqueFechas=[...new Set(rows.map(row=>row.fecha))]

            const updatedData = uniqueCategories.map(category => {

                uniqueFechas.map((fecha)=>{
    
                const filteredRows = rows.filter(row => row.categoria === category && row.fecha===fecha);
               
                const totalPrecio = filteredRows.reduce((total, row) => total + (row.precio || 0), 0);
             
                return { categoria: category, precio: totalPrecio, fecha:fecha };
            });
          
           } )
             
           setRows(updatedData);
        }, [rows]);
       

   /* useEffect(() => {
        const uniqueCategories = [...new Set(rows.map(row => row.categoria))];

        const groupedData = {};

        rows.forEach(row => {
            const { categoria, fecha, precio } = row;

            if (fecha) {
                const dateKey = new Date(fecha).toISOString().split('T')[0];

                if (!groupedData[dateKey]) {
                    groupedData[dateKey] = {};
                }

                if (!groupedData[dateKey][categoria]) {
                    groupedData[dateKey][categoria] = 0;
                }

                groupedData[dateKey][categoria] += precio || 0;
            }
        });

        const updatedRows = Object.entries(groupedData).map(([dateKey, dataForDate]:any) => {

            const totalForDate = Object.values(dataForDate).reduce((acc:any, cur) => acc + cur, 0);

            const newValues = Object.entries(dataForDate).map((categoria, precio) => ({
                    precio,
                    categoria
            }))
            return {
                precio:totalForDate, 
                categoria:newValues,
                fecha:new Date(dateKey)
            }
        });

        // Actualizar el estado rows con los datos agrupados
        setRows(updatedRows);
    }, [rows]);
*/
    // Actualizar el estado rows con los datos agrupados


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
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>,
        field: keyof Transaction
    ) => {
        const { value } = e.target;
        setTransaction((prev) => ({
            ...prev,
            [field]: field === "precio" ? parseFloat(value) : field === "fecha" ? new Date(value) : value
        }));
    };

    const handleSave = () => {
        const transaccion: Transaction = {
            precio: transaction.precio,
            categoria: transaction.categoria,
            fecha: transaction.fecha
        }
        setRows([...rows, transaccion]);
        setTransaction({ precio: 0, categoria: "", fecha: new Date() })
    }

    const handleSearch = (searchFecha, searchCategoria) => {
        const filterData = rows.filter((row) => {
            const filterCategoria = !searchCategoria || (row.categoria && row.categoria.includes(searchCategoria));
            const filterFecha = !searchFecha || (row.fecha && row.fecha.toISOString().slice(0, 10).includes(searchFecha.toISOString().slice(0, 10)));
            return filterCategoria && filterFecha;
        });
        const totalPrecio = filterData.reduce((total, row) => {
            return total + (row.precio || 0);
        }, 0);
        const rowsWithTotal = filterData.map(row => ({ ...row, precio: totalPrecio }));
        setRows(rowsWithTotal);
    };

    /*const handleInputCategoria=(event: React.ChangeEvent<{ value: string }>)=>{
        setTransaction({...transaction, categoria:event.target.value})
    }*/

    return (
        <>
            <Container component="main" style={{ margin: '50px auto' }}>
                <Paper>
                    <form style={{ display: "flex", gap: 8 }} onSubmit={(e) => e.preventDefault}>
                        <TextField
                            label="Precio"
                            type="number"
                            value={transaction.precio}
                            //onChange={(e) =>setTransaction({...transaction, precio:parseFloat(e.target.value)})}
                            onChange={(e) => { handleChange(e, "precio") }}
                            required
                        />

                        <TextField
                            label="Fecha"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={transaction.fecha ? transaction.fecha.toISOString().split('T')[0] : ''}
                            onChange={(e) => { handleChange(e, "fecha") }}
                        //onChange={(e) => setTransaction({...transaction, fecha:new Date(e.target.value)})}

                        />

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={transaction.categoria}
                            label="Categoria"
                            onChange={(e) => { handleChange(e, "categoria") }}
                        //onChange={(e:any)=>setTransaction({...transaction, categoria:e.target.value})}
                        >
                            <MenuItem value="Electrodoméstico">Electrodoméstico</MenuItem>
                            <MenuItem value="Ropa">Ropa</MenuItem>
                            <MenuItem value="Comida">Comida</MenuItem>
                            <MenuItem value="Limpieza">Limpieza</MenuItem>
                            <MenuItem value="Animal">Animal</MenuItem>
                        </Select>

                        <Button variant="outlined" color="primary" onClick={handleSave}>SAVE</Button>
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
                                    <TableCell align="right">{row.fecha ? row.fecha.toISOString().split('T')[0] : ''}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Paper>
                    <TextField
                        label="Fecha"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={searchFecha ? searchFecha.toISOString().split('T')[0] : ''}
                        onChange={(e) => setSearchFecha(new Date(e.target.value))}
                    />
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={searchCategoria}
                        onChange={(e: any) => setSearchCategoria(e.target.value)}
                        label="Categoria"
                    >
                        <MenuItem value="Electrodoméstico">Electrodoméstico</MenuItem>
                        <MenuItem value="Ropa">Ropa</MenuItem>
                        <MenuItem value="Comida">Comida</MenuItem>
                        <MenuItem value="Limpieza">Limpieza</MenuItem>
                        <MenuItem value="Animal">Animal</MenuItem>
                    </Select>
                    <Button variant="outlined" color="primary" onClick={() => handleSearch(searchFecha, searchCategoria)}>BUSCAR</Button>
                </Paper>
                <Paper style={{ marginTop: 30 }}>
                    <Bar data={data} options={chartOptions} />
                </Paper>
            </Container >
        </>)
}
export default AppFinanzas