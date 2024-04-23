import { Button, TextField } from '@material-ui/core';
import { useState, useEffect } from "react"
export default function Casilla({ addTask, newTask, updateTask }) {

  const [task, setTask] = useState({});
  console.log(task.index)
  console.log(task.row)
  useEffect(() => {
    setTask(newTask)
  }, [newTask])

  const handleClickTarea = () => {
    addTask(task)
  }

  const handleClickUpdate = () => {
    updateTask(task.index, task.row)
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', gap: 9 }}>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" value={task.row} onChange={(e) => setTask(e.target.value)} />
        <Button variant='outlined' onClick={handleClickTarea} color='secondary'>Create</Button>
        <Button variant='outlined' onClick={handleClickUpdate} color='secondary'>Update</Button>
      </div>
    </>
  )
}