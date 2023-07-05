import { Box, Button, CircularProgress,  } from '@mui/material'

type actionButtonProps = {
  isDisabled: boolean
  type: 'submit' | 'reset' | 'button'
  name: string
  variant?: 'text' | 'outlined' | 'contained'
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  onClick?: () => void
}

export const ActionButton = ( {  isDisabled, type, name, variant, color, onClick }: actionButtonProps) => {


  return (
    <Box m={2}
     sx= {{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'right',
        backgroundColor: 'transparent',
        width: '100%',

     }}>
      <Box m={1} >
        </Box>
        <Box m={1} >
        <Button  
            variant={variant || 'contained'} 
            color={color || 'primary'}
            size="large"
            disabled={isDisabled}
            type={type}
            onClick={onClick}
        >
            { isDisabled ? <CircularProgress size={24}/> : name }
        </Button>
        </Box>
    </Box>
  )
}
