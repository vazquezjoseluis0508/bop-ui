import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Grid, IconButton } from '@mui/material';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import { useMenuStore } from '../store/menus';



export const  MenuDelDia = ({ date }) => {
    const menus = useMenuStore(state => state.menus)

    const data = menus.filter((item) => item.fecha_menu.substring(0,10) === date)


    const [seleccionado, setSeleccionado] = React.useState(null);

    const handleSeleccionar = (id) => {
        if (id === seleccionado) {
          setSeleccionado(null); // deseleccionar si se hace clic en una tarjeta ya seleccionada
        } else {
          setSeleccionado(id); // seleccionar la tarjeta que se hace clic
        }
      };

    



  return (

    <>
    <Box margin={2} >
        <Grid container spacing={2}>
        {data.map((item, index) => {
            return (
            <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                    key={item.idMenuPersonal} 
                    onClick={() => handleSeleccionar(item.idMenuPersonal)}
                    elevation={seleccionado === item.idMenuPersonal ? 10 : 24}
                    sx={{
                        border: seleccionado === item.idMenuPersonal ? '4px solid' : 'none' ,
                        borderColor: seleccionado === item.idMenuPersonal ? 'primary.light' : 'default',
                    }}
                >
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="100"
                        width="50"
                        image={item.image}
                    />
                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: '80px',
                        }}
                    >
                        
                        <Typography variant="body2" color="text.secondary">
                        {item.descripcion}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton aria-label="add to favorites">
                            {
                                seleccionado === item.idMenuPersonal ?
                                <FavoriteSharpIcon sx={{color: 'primary.main' }}/>
                                :
                                <FavoriteSharpIcon sx={{color: 'grey.500' }}/>
                            }
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
            )
        }
        )}
        </Grid>

    </Box>
    </>
  );
}