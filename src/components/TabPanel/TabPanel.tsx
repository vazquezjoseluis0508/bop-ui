import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CheckboxListSecondary } from '../ListItem';
import { VerticalLinearStepper } from '../StepperComponent';
import { DIAS_SEMANA, MESES } from '../../constants';


const mockItemData = {

}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const a11yProps = (index: number) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export const VerticalTabs = () => {

  const diasAntesYDespues = 6

  const obtenerDias = (diasAntesYDespues: number): any => {
    const dias = diasAntesYDespues / 2
    let array : string[] = []
    
    for (let index = dias; index >= 0; index--) {
      const date = new Date()
      array.push(formatoDias(restarDias(date, index)))
    } 

    for (let index = 0; index <= dias; index++) {
      const date = new Date()
      array.push(formatoDias(sumarDias(date, index)))
    } 
    return array.filter((item,index)=>{
      return array.indexOf(item) === index;
    })
  }

  const sumarDias  = (fecha, dias): Date =>{
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }
  const restarDias  = (fecha, dias): Date =>{
    fecha.setDate(fecha.getDate() - dias);
    return fecha;
  }

  const formatoDias = (date: Date) => {
    return DIAS_SEMANA[date.getDay()] + ', ' + date.getDate() + ' de ' + MESES[date.getMonth()]  // + ' de ' + date.getUTCFullYear()
  }

  const dias = obtenerDias(diasAntesYDespues)

  
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 624 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        
          { dias.map( (element, index) => { 
              return (<Tab label={element.toString()} {...a11yProps(index)} />)
            })
          }
        
      </Tabs> 
      <TabPanel value={value} index={0}>
        {/* <VerticalLinearStepper /> */}
      </TabPanel>
      
    </Box>
  );
}
