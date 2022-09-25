import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CheckboxListSecondary } from '../ListItem';
import { VerticalLinearStepper } from '../StepperComponent';

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
        <Tab label="Domingo 25 Set " {...a11yProps(0)} />
        <Tab label="Lunes 26 Set" {...a11yProps(1)} />
        <Tab label="Martes 27 Set" {...a11yProps(2)} />
        <Tab label="Miercoles 28 Set" {...a11yProps(3)} />
        <Tab label="Jueves 29 Set" {...a11yProps(4)} />
        <Tab label="Viernes 30 Set" {...a11yProps(5)} />
        <Tab label="Sabado 1 Oct" {...a11yProps(6)} />
        <Tab label="Domingo 2 Oct" {...a11yProps(7)} />
        <Tab label="Lunes 3 Oct" {...a11yProps(8)} />
        <Tab label="Sabado 4 Oct" {...a11yProps(9)} />
        <Tab label="Domingo 5 Oct" {...a11yProps(10)} />
        <Tab label="Lunes 6 Oct" {...a11yProps(11)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <VerticalLinearStepper />
      </TabPanel>
      <TabPanel value={value} index={1}>
        No item to show
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </Box>
  );
}
