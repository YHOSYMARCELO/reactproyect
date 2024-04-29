import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import FormDetails from './FormDetails.tsx';
import {useParams} from "react-router-dom";
import {useState} from "react";
import React from "react"
import DetailsMaterial from './DetailsMaterial.tsx';
function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));

  interface Props{

  }
  const STab:React.FC<Props>=()=>{
    const {id}= useParams();
    const classes = useStyles();
    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue:any) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" >
            <Tab label="Detalles" {...a11yProps(0)} />
            <Tab label="Composicion" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <DetailsMaterial valor={value} index={0}/>
        <FormDetails id={id} value={value} index={1}/>    
      </div>
    );
}
export default STab; 