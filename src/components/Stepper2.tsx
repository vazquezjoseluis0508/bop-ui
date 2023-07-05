import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = ['Seleccione un dia del calendario.', 'Seleccione su turno.', 'Finalmente Seleccione el menu del dia.'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(-1);

 


  return (
    <Box sx={{ width: '75%' }} mb={5}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          
          
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
     
    </Box>
  );
}