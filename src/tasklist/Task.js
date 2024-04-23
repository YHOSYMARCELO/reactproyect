import { AppBar, Toolbar, Typography } from '@material-ui/core';
import {useState} from "react"; 
import Casilla from './Casilla'
import ContainTask from './ContainTask';
export default function Task() {
    const [dataFilled,setDataFilled]= useState([]);
    const [dataUpdate,setDataUpdate] = useState({}); 
    const [newData, setNewData]= useState({});
    const handleTask=(tarea)=>{
        setDataFilled([...dataFilled, tarea]); 
    }
    const handleUpdate=(index,row)=>{
        setDataUpdate({index,row}); 
    }
    const handleUpdateInput=(id,tarea)=>{
        setNewData({id,tarea})
    }
    console.log(newData)
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
            <ContainTask tasks={dataFilled} updateTask={handleUpdate} newData={newData}/>
        </>)
}