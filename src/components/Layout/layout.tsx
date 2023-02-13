import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { CssBaseline } from '@mui/material'
import { Header } from '../header'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
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
