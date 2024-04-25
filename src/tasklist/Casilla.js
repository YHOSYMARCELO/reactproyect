import { Button, TextField } from '@material-ui/core';
import { useState, useEffect } from "react"
export default function Casilla({ addTask, newTask, updateTask }) {

  const [task, setTask] = useState({ row: "" });
  console.log(task.index)
  console.log(task.row)
  useEffect(() => {
    setTask(newTask)
  }, [newTask])

  const handleClickTarea = () => {
    try {
      if(!task.row.trim()){
        throw new Error ("El campo esta vacío")
      }
      addTask(task.row)
      setTask({ row: "" })
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleClickUpdate = () => {
    updateTask(task.index, task.row)
    /* const handleUpdate = (index, updatedTask) => {
        const updatedTasks = [...tasksGot];
        updatedTasks[index] = updatedTask;
        setTasksGot(updatedTasks);
        updateTask(index, updatedTask);
    }*/
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', gap: 9 }}>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" value={task.row} onChange={(e) => setTask({ ...task, row: e.target.value })} />
        <Button variant='outlined' onClick={handleClickTarea} color='secondary'>Create</Button>
        <Button variant='outlined' onClick={handleClickUpdate} color='secondary'>Update</Button>
      </div>
    </>
  )
}