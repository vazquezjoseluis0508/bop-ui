import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { DIAS_SEMANA, MESES } from '../constants'
import { VerticalLinearStepper } from './Stepper'
import { TabPanel } from './TabPanel'
import { Step, StepConnector, stepConnectorClasses, StepContent, StepIconProps, StepLabel, Stepper, styled } from '@mui/material'



const a11yProps = (index: number) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  }
}

const Dia = ({ dia }: { dia: string }) => {
  return (
    <div>
      <Typography variant="h6">{dia}</Typography>
    </div>
  )
}

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
    'linear-gradient(90deg, rgba(255,29,0,1) 0%, rgba(191,9,9,1) 0%, rgba(52,9,0,1) 99%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
    'linear-gradient(90deg, rgba(255,29,0,1) 0%, rgba(191,9,9,1) 0%, rgba(52,9,0,1) 99%)',
  }),
}));

function IconoDia(props: StepIconProps, dia: string) {
  const { active, completed, className } = props;


  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {/* {icons[String(props.icon)]} */}
      {dia}
    </ColorlibStepIconRoot>
  );
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  width: 4,
  border: 0,
  backgroundImage: 'linear-gradient(0deg, rgba(126,3,3,1) 0%, rgba(249,9,9,1) 100%);',
  borderRadius: 5,
  marginLeft: 20
}));



export const Calendar = () => {
  const diasAntesYDespues = 10

  const obtenerDias = (diasAntesYDespues: number): any => {
    const dias = diasAntesYDespues / 2
    const array: string[] = []

    for (let index = dias; index >= 0; index--) {
      const date = new Date()
      array.push(formatoDias(restarDias(date, index)))
    }

    for (let index = 0; index <= dias; index++) {
      const date = new Date()
      array.push(formatoDias(sumarDias(date, index)))
    }
    return array.filter((item, index) => {
      return array.indexOf(item) === index
    })
  }

  const sumarDias = (fecha, dias): Date => {
    fecha.setDate(fecha.getDate() + dias)
    return fecha
  }

  const restarDias = (fecha, dias): Date => {
    fecha.setDate(fecha.getDate() - dias)
    return fecha
  }

  const formatoDias = (date: Date) => {
    //retornar solo los primeros 3 caracteres del dia de la semana
    const dia = DIAS_SEMANA[date.getDay()].substring(0, 3)
    return dia
    // return DIAS_SEMANA[date.getDay()] + ', ' + date.getDate() + ' de ' + MESES[date.getMonth()] // + ' de ' + date.getUTCFullYear()
  }

  const dias = obtenerDias(diasAntesYDespues)

  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 500, p: 2 }}
    >

      <Stepper 
        orientation='vertical'
        variant='elevation'
        // alternativeLabel 
        // activeStep={1} 
        connector={<ColorlibConnector />}
        >

          { dias.map((element, index) => {
            return (
              <>
              <Step 
                key={index}

                // sx={{
                //   border: 1,
                //   borderColor: 'primary.dark',
                //   m: 2,
                //   '&:hover': {
                //       backgroundImage:
                //         'linear-gradient(90deg, rgba(255,29,0,1) 0%, rgba(191,9,9,1) 0%, rgba(52,9,0,1) 99%)',
                //       boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
                //   },
                //   '&.Mui-selected': {
                //     backgroundImage: 'linear-gradient(90deg, rgba(255,29,0,1) 0%, rgba(191,9,9,1) 0%, rgba(52,9,0,1) 99%)',
                //     color: 'primary.contrastText',
                //   },
                
                // }}

              >
                 <StepLabel StepIconComponent={
                    (props) => IconoDia(props, element)
                  }>
                    {/* {element.toString()} */}
                 </StepLabel>
                 {/* <Typography variant='caption'>17/02</Typography> */}
              {/* <Tab 
                key={index} 
                label={element.toString()} 
                {...a11yProps(index)} 
                
                
                
                /> */}
              </Step>

              </>

              )
          })
          }
        </Stepper>

      {/* </Tabs>
      <TabPanel value={value} index={0}>
        <VerticalLinearStepper />
      </TabPanel> */}

    </Box>
  )
}
