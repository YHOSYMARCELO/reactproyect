import { Container, TableCell, TableRow, TableHead, TableBody, Paper, Table, TableContainer } from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import UpdateIcon from '@material-ui/icons/Update';
import { useState, useEffect } from "react";
export default function ContainTask({ tasks, updateTask, newData }) {
    const [tasksGot, setTasksGot] = useState([]);
    console.log(newData.tarea)
    useEffect(() => {
        setTasksGot(tasks);
    }, [tasks])
    const deleteTask = (index) => {
        const eliminar = tasksGot.filter((_, i) => (i !== index));
        setTasksGot(eliminar)
    }
    const handleUpdate = (index, row) => {
        updateTask(index, row);
    }
    
   /* useEffect(()=>{
        setNewDat(newData); 
    },[newData])*/
    
    useEffect(() => {
        const update = tasksGot.map((tarea, i) => (i === 1 ? newData.tarea : tarea));
        setTasksGot(update)
    },[newData])

return (
    <>
        <Container>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Tarea</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Delete</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }} align="center">Update</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasksGot.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{row}</TableCell>
                                <TableCell align="center" ><HighlightOffIcon onClick={() => deleteTask(index)} /></TableCell>
                                <TableCell align="center">
                                    <UpdateIcon onClick={() => handleUpdate(index, row)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>

    </>
)
}