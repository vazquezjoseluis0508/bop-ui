import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { DIAS_SEMANA, MESES } from '../constants'
import { VerticalLinearStepper } from './StepperComponent'
import { TabPanel } from './tabPanel'



const a11yProps = (index: number) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  }
}

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
    return DIAS_SEMANA[date.getDay()] + ', ' + date.getDate() + ' de ' + MESES[date.getMonth()] // + ' de ' + date.getUTCFullYear()
  }

  const dias = obtenerDias(diasAntesYDespues)

  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 500 }}
    >
      <Tabs
         orientation="vertical"
         variant="scrollable"
         value={value}
         onChange={handleChange}
         aria-label="Vertical tabs example"
         sx={{ borderRight: 1, borderColor: 'divider' }}
      >

          { dias.map((element, index) => {
            return (
              <Tab 
                key={index} 
                label={element.toString()} 
                {...a11yProps(index)} 
                
                sx={{
                  border: 0.5,
                  borderColor: 'primary.dark',
                  borderRadius: 1,
                  alignItems: 'start',
                  textAlign: 'start',
                  m: 0.2,
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                    color: 'primary.contrastText',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'primary.dark',
                    color: 'primary.contrastText',
                  },

                }}
                />
              )
          })
          }

      </Tabs>
      <TabPanel value={value} index={0}>
        <VerticalLinearStepper />
      </TabPanel>

    </Box>
  )
}
