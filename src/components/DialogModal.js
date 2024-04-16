
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import {useState } from "react";
export default function DialogModal(props) {

    const { onClose, open, onUpdate, onCreate, onDelete} = props;
    const [color, setColor] = useState("");
    const [name, setName] = useState("");

    const handleClose = () => {
        onClose();
    }

    const handleUpdate = () => {
        onUpdate(name, color);
        onClose();
    }
    const handleCreate=()=>{
        onCreate(name, color); 
    }
    const handleDelete=()=>{
        onDelete(); 
    }
    return (<>
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Formulario</DialogTitle>
            <FormControl style={{display:"flex", padding:30, width:400, height:400, flexDirection: "column", gap:10}} onSubmit={(e) => (e.preventDefault)} >
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="filled-error"
                    variant="filled"
                />

                <TextField
                    label="Color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    id="filled-error"
                    variant="filled"
                />
                <Box style={{display:"flex", gap:3}}>
                <Button style={{ marginTop: 10 }} color="secondary" onClick={handleUpdate} variant='outlined'>Update</Button>
                <Button style={{ marginTop: 10 }} color="secondary" onClick={handleDelete} variant='outlined'>Delete</Button>
                <Button style={{ marginTop: 10 }} color="secondary" onClick={handleCreate} variant='outlined'>Create</Button>
                </Box>
            </FormControl>
        </Dialog>
    </>
    )
}