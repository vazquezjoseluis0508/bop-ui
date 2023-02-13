import { Link, Typography } from '@mui/material'

export const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link href="http://www.control-app.com/">
        Control App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
