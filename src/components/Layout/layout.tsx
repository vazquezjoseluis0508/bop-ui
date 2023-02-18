import { makeStyles } from '@material-ui/core/styles'
import { CssBaseline } from '@mui/material'
import { Header } from '../Header'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh'
  }
})

export const Layout = ({ children }) => {
  const classes = useStyles()

  return (
    <>
    <CssBaseline />
      <Header />

      <div className={classes.root}>
        {children}
      </div>
    </>
  )
}
