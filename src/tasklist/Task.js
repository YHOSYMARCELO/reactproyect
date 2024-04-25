import { AppBar, Toolbar, Typography } from '@material-ui/core';
import {useEffect, useState} from "react"; 
import Casilla from './Casilla'
import ContainTask from './ContainTask';
export default function Task() {
    const [dataFilled,setDataFilled]= useState([]);
    const [dataUpdate,setDataUpdate] = useState({}); 
    const [newData, setNewData]= useState({});

    useEffect(()=>{
        localStorage.setItem('tasks', JSON.stringify(dataFilled)); 
    },[dataFilled])

    useEffect(()=>{
        const dataStored=JSON.parse(localStorage.getItem('tasks'))
        if(dataStored){
            setDataFilled(dataStored)
        }
    },[])
    const handleTask=(tarea)=>{
        const updateDataFilled=[...dataFilled, tarea]
        setDataFilled(updateDataFilled); 
    }

    const handleUpdate=(index,row)=>{
        setDataUpdate({index,row}); 
    }
    /*const handleUpdateInput=(id,tarea)=>{
        setNewData({id,tarea})
    }*/
    const handleUpdateInput = (index, tarea) => { 
        setNewData({ index, tarea });
    }
    
    const handleDeleteTask=(index)=>{
            const eliminar = dataFilled.filter((_, i) => (i !== index));
            setDataFilled(eliminar)
            if (newData.index === index) {
                setNewData({}); // Limpiar newData si se eliminó la tarea que se estaba editando
            } else if (newData.index > index) {
                // Si el índice de la tarea eliminada es menor que el índice de la tarea editada, reducir el índice en newData
                setNewData({ ...newData, index: newData.index - 1 });
            }
        }
  
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        TaskList
                    </Typography>
                </Toolbar>
            </AppBar>
            <Casilla addTask={handleTask} newTask={dataUpdate} updateTask={handleUpdateInput}/>
            <ContainTask tasks={dataFilled} updateTask={handleUpdate} newData={newData} deleteTask={handleDeleteTask}/>
        </>)
}