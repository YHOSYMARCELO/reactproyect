
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Se requiere el nombre'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('La descripción es obligatoria'),
});
export default function SimpleDialog(props) {
  const { onClose, open, onUpdate } = props;
  const handleClose = () => {
    onClose();
  };

  const handleClickUpdate = (values) => {
    onUpdate(values);
  }
  return (

    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Formulario</DialogTitle>
      <Formik
        initialValues={{
          name: "",
          description: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {

          handleClickUpdate(values);

        }}
      >
          <Form style={{ height: 400, width: 400 }}>
            <Box boxShadow={3} style={{ display: "flex", padding: 3, gap: 8, flexDirection: "column", alignItems: "center" }}>
              <Field
                as={TextField}
                label="Name"
                name="name"
                variant="outlined"
                margin="normal"
                helperText={<ErrorMessage name="name" />}
              />
              <Field
                as={TextField}
                label="Description"
                name="description"
                variant="outlined"
                margin="normal"
                helperText={<ErrorMessage name="description" />}
              />

              <Box display="flex" justifyContent="center" width="100%" marginTop={2}>
                <Button onClick={handleClickUpdate} type="submit" variant="contained" color="secondary" style={{ marginTop: 20, marginRight: 10 }}>
                  Update
                </Button>
              </Box>
            </Box>
          </Form> 
      </Formik>
    </Dialog>

  );

}