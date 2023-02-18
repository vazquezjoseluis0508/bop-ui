import { Box, Button, Divider, FormControlLabel, Paper, Radio, RadioGroup, Step, StepContent, StepLabel, Stepper, Typography } from '@mui/material'
import { type Theme } from '@mui/material/styles'
import { createStyles, makeStyles } from '@mui/styles'
import React from 'react'
import { MenuDelDia } from '../MenuDelDia'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    button: {
      marginRight: theme.spacing(1)
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  })
)

function getSteps () {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad']
}

function getStepContent (step: number) {
  switch (step) {
    case 0:
      return 'Select campaign settings...'
    case 1:
      return 'What is an ad group anyways?'
    case 2:
      return 'This is the bit I really care about!'
    default:
      return 'Unknown step'
  }
}

export const StepperComponent = () => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const [skipped, setSkipped] = React.useState(new Set<number>())
  const steps = getSteps()

  const isStepOptional = (step: number) => {
    return step === 1
  }

  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {}
          const labelProps: { optional?: React.ReactNode } = {}
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      <div>
        {activeStep === steps.length
          ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
            )
          : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
            )}
      </div>
    </div>
  )
}

export const VerticalLinearStepper = () => {
  const steps = [
    {
      id: 1,
      label: 'Porfavor seleccione el turno.'
    },
    {
      id: 2,
      label: 'Seleccione el menu del dia.'
    },
    {
      id: 3,
      label: 'Guardar los cambios.'
    }
  ]

  const [activeStep, setActiveStep] = React.useState(0)

  const [value, setValue] = React.useState('female')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <Box sx={{ maxWidth: 800 }} ml={3}>

      <Box sx={{ mb: 2 }}>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
            row
          >
            <FormControlLabel value="Turno 11:00" control={<Radio />} label="Turno 11:00" />
            <FormControlLabel value="Turno 14:00" control={<Radio />} label="Turno 14:00" />
            <FormControlLabel value="Turno 20:00" control={<Radio />} label="Turno 20:00" />
          </RadioGroup>

      </Box>

      <Divider />

      <Box sx={{ mb: 2 }}>
        <MenuDelDia />
      </Box>

      <Divider />

      <Box sx={{ mb: 2 }} alignItems='flex-end'>
        <div>
          <Button
            variant="outlined"
            color='secondary'
            onClick={handleNext}
            sx={{ mt: 1, mr: 1 }}
          >
            Guardar
          </Button>
          <Button
            color='secondary'
            onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </div>
      </Box>

    </Box>
  )
}
